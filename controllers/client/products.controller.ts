import { Request, Response } from "express";
import Product from "../../models/products.model";
import ColorProduct from "../../models/colorProduct.model";
import ProductItem from "../../models/product-items.model";
import SizeProduct from "../../models/sizeProduct.model";
import { ObjectId } from "mongodb";
import ProductAssets from "../../models/productAssets.model";
import Assets from "../../models/assets.model";
import console from "console";
import ROUTERS from "../../constants/routes/index.routes";
import unidecode from "unidecode";
import ProductCategory from "../../models/productsCategories.model";
import { log } from "util";

const detail = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const product = await Product.findOne({
    slug: slug,
    deleted: false,
    status: "active",
  });

  const colors = await ProductItem.find({
    productId: product.id,
  });
  product["color"] = [];
  product["size"] = [];
  product["images"] = [];
  for await (const it of colors) {
    const color = await ColorProduct.findOne({
      _id: it.color,
    });
    if (!product["color"].find((co: any) => co.id == color.id))
      product["color"].push(color);
    const size = await SizeProduct.findOne({
      _id: it.size,
    });
    if (size && !product["size"].find((siz: any) => siz.id == size.id))
      product["size"].push(size);
  }

  const productsAssets = await ProductAssets.find({
    productId: product.id,
  }).sort({
    type: 1,
  });

  for await (const it of productsAssets) {
    const assets = await Assets.findOne({
      _id: it.assetsId,
    });
    product["images"].push(assets);
  }

  res.render("client/pages/products/detail.pug", {
    pageTitle: product.name,
    product: product,
  });
};

const getSize = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const product = await Product.findOne({
    slug: slug,
  });
  const listItems = await ProductItem.find({
    productId: new ObjectId(product.id),
    color: new ObjectId(req.body.color),
    status: "active",
  });
  const listSizes = [];
  listItems.forEach((it) => {
    if (!listSizes.find((size) => size == it.size.toString())) {
      listSizes.push(it.size.toString());
    }
  });

  res.json({
    code: 200,
    listSizes,
  });
};

const getItem = async (req: Request, res: Response) => {
  const { color, size } = req.body;
  const { slug } = req.params;
  const product = await Product.findOne({
    slug: slug,
  });
  const listItems = await ProductItem.findOne({
    productId: new ObjectId(product.id),
    color: new ObjectId(color),
    size: new ObjectId(size),
  }).lean();

  const productItem = { ...listItems };
  productItem["priceNew"] = Math.ceil(
    productItem.price - productItem.price * (productItem.discount / 100)
  );

  res.json({
    code: 200,
    productItem: productItem,
  });
};

const search = async (req: Request, res: Response) => {
  try {
    const { method } = req.params;
    let key = req.query["tu-khoa"].toString();
    const regexTitle = new RegExp(key, "i");
    let keySlug = unidecode(key.trim().replace(/\s+/g, "-"));
    const regexSlug = new RegExp(keySlug, "i");
    const find = {
      deleted: false,
      status: "active",
      $or: [
        {
          name: regexTitle,
        },
        {
          slug: regexSlug,
        },
      ],
    };

    const products = await Product.find(find).lean();
    const newProduct = [];

    for await (const it of products) {
      let data = { ...it };
      it["img_main"] = [];
      const img = await ProductAssets.find({
        productId: it._id,
        type: "main",
      });
      if (img.length > 0) {
        for await (const image of img) {
          const assets__main = await Assets.findOne({
            _id: image.assetsId,
          });
          it["img_main"].push(assets__main.path);
        }
      }
      data["img_main"] = it["img_main"];

      const listItem = await ProductItem.find({
        productId: it._id,
      });
      if (listItem.length > 0) {
        if (listItem.length > 1) {
          const minItem = listItem.reduce((min, item) => {
            return Math.ceil(item.price * item.discount) <
              Math.ceil(min.price * min.discount)
              ? item
              : min;
          }, listItem[0]);
          it["priceNew"] = Math.ceil(
            minItem.price - minItem.price * (minItem.discount / 100)
          );
          it.price = minItem.price;
          it.discount = minItem.discount;
          // data["priceNew"] = it["priceNew"];
        } else {
          it["priceNew"] = Math.ceil(
            listItem[0].price - listItem[0].price * (listItem[0].discount / 100)
          );
          it.price = listItem[0].price;
          it.discount = listItem[0].discount;
        }
        data["priceNew"] = it["priceNew"];
        data["price"] = it["price"];
        data["discount"] = it["discount"];
        data[
          "link"
        ] = `${ROUTERS.CLIENT.PRODUCT.PATH}${ROUTERS.CLIENT.PRODUCT.DETAIL}/${it["slug"]}`;
        newProduct.push(data);
      }
    }

    if (method == "trang") {
      res.render("client/pages/products/search.pug", {
        products,
        key,
      });
    } else {
      res.json({
        code: 200,
        products: newProduct,
      });
    }
  } catch (error) {
    res.status(400);
  }
};
const index = async (req: Request, res: Response) => {
  const { khoanggia, mausac, kichthuoc } = req.query;

  // Tìm kiếm sản phẩm với điều kiện cơ bản
  const findProduct = {
    status: "active",
    deleted: false,
  };

  // Xử lý sắp xếp
  let sortProduct = {};
  if (typeof req.query.sapxep === "string") {
    const name = req.query.sapxep.split("-")[0];
    const value = req.query.sapxep.split("-")[1];
    if (name === "tensanpham") {
      sortProduct["name"] = value === "tangdan" ? 1 : -1;
    } else if (name === "sanpham")
      sortProduct["position"] = value === "moinhat" ? -1 : 1;
    // else if (name === "sanpham")
  } else {
    sortProduct["position"] = -1;
  }

  // Lấy danh sách sản phẩm
  let products = await Product.find(findProduct).sort(sortProduct);

  // Lọc sản phẩm theo màu sắc, kích thước và khoảng giá
  const listProduct = [];
  await Promise.all(
    products.map(async (it) => {
      const find = { productId: it.id };

      if (mausac) {
        const color = await ColorProduct.findOne({ slug: mausac });
        find["color"] = color ? color.id : it.id;
      }
      if (kichthuoc) {
        const size = await SizeProduct.findOne({ slug: kichthuoc });
        find["size"] = size ? size.id : it.id;
      }

      const items = await ProductItem.findOne(find);
      if (items) {
        if (khoanggia) {
          const [min, max] = khoanggia.toString().split("-").map(Number);
          const price = Math.ceil(
            items.price - items.price * (items.discount / 100)
          );
          if (price >= min && price <= max) {
            listProduct.push(it);
          }
        } else if (typeof req.query.sapxep === "string") {
          const name = req.query.sapxep.split("-")[0];
          const value = req.query.sapxep.split("-")[1];
          if (name == "danggiam") {
            if (value == "true" && items.discount > 0) listProduct.push(it);
            if (value == "false" && items.discount == 0) listProduct.push(it);
          }
        } else {
          listProduct.push(it);
        }
      }
    })
  );

  // Thêm thông tin hình ảnh và giá cho sản phẩm
  await Promise.all(
    listProduct.map(async (it) => {
      // Thêm hình ảnh chính
      it["img_main"] = [];
      const img = await ProductAssets.find({ productId: it.id, type: "main" });
      if (img.length > 0) {
        it["img_main"] = await Promise.all(
          img.map(async (image) => {
            const assets__main = await Assets.findOne({ _id: image.assetsId });
            return assets__main.path;
          })
        );
      }

      // Tính giá và giảm giá
      const listItem = await ProductItem.find({ productId: it.id });
      if (listItem.length > 0) {
        const minItem = listItem.reduce((min, item) =>
          Math.ceil(item.price - item.price * (item.discount / 100)) <
          Math.ceil(min.price - min.price * (min.discount / 100))
            ? item
            : min
        );
        it["priceNew"] = Math.ceil(
          minItem.price - minItem.price * (minItem.discount / 100)
        );
        it.price = minItem.price;
        it.discount = minItem.discount;
      }
    })
  );

  // Sắp xếp theo giá nếu có
  if (typeof req.query.sapxep === "string") {
    const name = req.query.sapxep.split("-")[0];
    const value = req.query.sapxep.split("-")[1];
    if (name === "gia") {
      listProduct.sort((a, b) =>
        value === "tangdan" ? a.priceNew - b.priceNew : b.priceNew - a.priceNew
      );
    }
  } else {
    listProduct.sort((a, b) => b.position - a.position);
  }

  // Phân trang
  let pagination = {
    current: req.query.trang ? parseInt(req.query.trang as string) : 1,
    limit: 9,
  };
  pagination["totalProduct"] = listProduct.length;
  pagination["totalPage"] = Math.ceil(
    pagination["totalProduct"] / pagination.limit
  );
  if (pagination.current > pagination["totalPage"]) pagination.current = 1;
  pagination["skip"] = (pagination.current - 1) * pagination.limit;
  const paginatedList = listProduct.slice(
    pagination["skip"],
    pagination["skip"] + pagination.limit
  );

  // Lấy danh sách màu sắc và kích thước
  const listColors = await ColorProduct.find({ status: "active" });
  const listSizes = await SizeProduct.find({ status: "active" });

  res.render("client/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: paginatedList,
    listColors,
    listSizes,
    pagination,
  });
};
export { index, detail, getSize, getItem, search };
