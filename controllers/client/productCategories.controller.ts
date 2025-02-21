import { Request, Response } from "express";
import Product from "../../models/products.model";
import ProductAssets from "../../models/productAssets.model";
import Assets from "../../models/assets.model";
import ProductItem from "../../models/product-items.model";
import ProductCategory from "../../models/productsCategories.model";
import { ObjectId } from "mongodb";
import ColorProduct from "../../models/colorProduct.model";
import SizeProduct from "../../models/sizeProduct.model";

const index = async (req: Request, res: Response) => {
  const { khoanggia, mausac, kichthuoc } = req.query;

  const { slug } = req.params;
  const category = await ProductCategory.findOne({
    slug: slug,
    status: "active",
    deleted: false,
  });
  const subCategory = [];
  subCategory.push(category.id);
  const getSubCategory = async (id: any) => {
    const sub = await ProductCategory.find({
      parentId: new ObjectId(id),
      status: "active",
      deleted: false,
    });
    for (const it of sub) {
      subCategory.push(it.id);
      await getSubCategory(it.id);
    }
  };
  await getSubCategory(category.id);
  let products = await Product.find({
    categoryId: {
      $in: subCategory,
    },
  });
  const listProduct = [];
  for await (const it of products) {
    const find = {
      productId: it.id,
    };

    if (mausac) {
      const color = await ColorProduct.findOne({
        slug: mausac,
      });
      if (color) find["color"] = color.id;
      else find["color"] = it.id;
    }
    if (kichthuoc) {
      const size = await SizeProduct.findOne({
        slug: kichthuoc,
      });
      console.log(size);

      if (size) find["size"] = size.id;
      else find["size"] = it.id;
    }

    console.log(find);
    const items = await ProductItem.findOne(find);
    if (items) {
      if (khoanggia) {
        let [min, max] = khoanggia.toString().split("-").map(Number);
        const price = Math.ceil(
          items.price - items.price * (items.discount / 100)
        );
        if (price <= max && price >= min) listProduct.push(it);
      } else listProduct.push(it);
    }
  }

  // console.log(products);
  for await (const it of listProduct) {
    it["img_main"] = [];
    const img = await ProductAssets.find({
      productId: it.id,
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

    const listItem = await ProductItem.find({
      productId: it.id,
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
      } else {
        it["priceNew"] = Math.ceil(
          listItem[0].price - listItem[0].price * (listItem[0].discount / 100)
        );
        it.price = listItem[0].price;
        it.discount = listItem[0].discount;
      }
    } else {
    }
  }

  res.render("client/pages/productCategories/index.pug", {
    pageTitle: category.name,
    category,
    products: listProduct,
  });
};

export { index };
