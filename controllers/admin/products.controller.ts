import { Request, Response } from "express";
import {
  productAssetsService,
  productService,
  sizeProductService,
  colorProductService,
  productItemService,
  accountsService,
  assetsService,
} from "../../services/admin/index.service";
import { ObjectId } from "mongodb";
import Product from "../../models/products.model";
import ColorProduct from "../../models/colorProduct.model";
import SizeProduct from "../../models/sizeProduct.model";
import ProductCategory from "../../models/productsCategories.model";
import createTree from "../../helpers/createTree.helper";
import ProductAssets from "../../models/productAssets.model";
import Assets from "../../models/assets.model";
import unidecode from "unidecode";
import console from "console";
import Account from "../../models/accounts.model";

const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
  };
  if (req.query.trang_thai) {
    find["status"] = req.query.trang_thai;
  }
  const search = req.query.tim_kiem || "";
  if (typeof search === "string") {
    const findSlug = unidecode(search.trim().replace(/\s+/g, "-"));
    const regexTitle = new RegExp(search, "i");
    const regexSlug = new RegExp(findSlug, "i");
    const regexSlugDb = new RegExp(search.trim().replace(/\s+/g, "-"), "i");
    find["$or"] = [
      {
        title: regexTitle,
      },
      {
        slug: regexSlug,
      },
      {
        slug: regexSlugDb,
      },
    ];
  }

  let pagination: any = {
    current: req.query.trang ? parseInt(req.query.trang as string) : 1,
    limit: req.query.sotrang
      ? req.query.sotrang == "full"
        ? await Product.countDocuments(find)
        : parseInt(req.query.sotrang as string)
      : 5,
  };
  pagination["totalProduct"] = await Product.countDocuments(find);
  pagination["totalPage"] = Math.ceil(
    pagination["totalProduct"] / pagination.limit
  );
  if (pagination.current > pagination.totalPage) pagination.current = 1;
  pagination["skip"] = (pagination.current - 1) * pagination.limit;
  const products = await Product.find(find)
    .lean()
    .sort({
      position: -1,
    })
    .limit(pagination["limit"])
    .skip(pagination["skip"]);
  for await (const it of products) {
    const productItem = await productItemService.get({
      productId: it["_id"],
    });
    if (productItem.length > 0) {
      it["priceNew"] = await productItem.map((item) =>
        Math.ceil(item.price - item.price * (item.discount / 100))
      );
    }
    const author = await accountsService.get({
      _id: it.createdBy,
    });
    if (author.length > 0) it["author"] = author[0]["fullname"];

    const productAssets = await productAssetsService.get({
      productId: it["_id"],
      deleted: false,
    });
    it["images"] = [];
    for await (const element of productAssets) {
      const assets = await assetsService.get({
        _id: element.assetsId,
      });
      it["images"].push(assets[0]);
    }
  }

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    pageDesc: "Danh sách sản phẩm",
    products: products,
    pagination,
  });
};

const create = async (req: Request, res: Response) => {
  const getSize = await sizeProductService.get({
    status: "active",
  });
  const getColor = await colorProductService.get({
    status: "active",
  });
  const categories = await ProductCategory.find({
    deleted: false,
  });
  const listCategories = createTree(categories);
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm sản phẩm",
    pageDesc: "Thêm sản phẩm",
    getSize: getSize,
    getColor: getColor,
    listCategories,
  });
};

const createPost = async (req: Request, res: Response) => {
  if (res.locals.ROLE.permission.includes("products-create")) {
    const createProduct = await productService.create(
      req.body,
      res.locals.INFOR_USER.id
    );
    const createProductAssets = await productAssetsService.create(
      createProduct.id,
      req.body
    );
    const createProductItem = await productItemService.create(
      createProduct.id,
      req.body.bien_the,
      res.locals.INFOR_USER.id
    );
    res.json({ code: 200 });
  } else {
    res.json({ code: 503 });
  }
};

const update = async (req: Request, res: Response) => {
  // try {
  const products = await Product.findOne({
    _id: req.params.id,
    deleted: false,
  }).lean();

  const productItem = await productItemService.get({
    productId: products["_id"],
  });
  if (productItem.length > 0) {
    productItem.forEach(async (it) => {
      it["infoColor"] = await ColorProduct.findOne({
        _id: it.color,
      });
      it["infoSize"] = await SizeProduct.findOne({
        _id: it.size,
      });
    });
  }
  try {
    const author = await accountsService.get({
      _id: products.createdBy,
    });
    if (author) products["author"] = author[0]["fullname"];
  } catch (error) {
    products["author"] = "Chưa biết";
  }

  try {
    const updatetor = await accountsService.get({
      _id: products.updatedBy,
    });
    products["updatetor"] = updatetor[0]["fullname"];
  } catch (error) {}

  const getSize = await sizeProductService.get({
    status: "active",
  });
  const getColor = await colorProductService.get({
    status: "active",
  });

  const categories = await ProductCategory.find({
    deleted: false,
  });
  const listCategories = createTree(categories);

  if (products["categoryId"].length > 0)
    products["categories"] = products.categoryId
      .map((id) => id.toString())
      .join(" ");

  res.render("admin/pages/products/update.pug", {
    pageTitle: products.name,
    pageDesc: "Cập nhật sản phẩm",
    products: products,
    getColor,
    getSize,
    productItem,
    listCategories,
  });
  // } catch (error) {
  //      res.redirect("back");
  // }
};

const getImage = async (req: Request, res: Response) => {
  if (res.locals.ROLE.permission.includes("products-update")) {
    const { id } = req.params;
    const productAssets = await ProductAssets.find({
      productId: id,
    }).sort({
      position: "asc",
    });

    console.log(productAssets);
    const main = productAssets.filter((it) => it.type == "main");
    const sub = productAssets.filter((it) => it.type == "sub");

    const images_main = [];
    const images_main_id = [];
    const images_sub = [];
    const images_sub_id = [];
    for await (const it of main) {
      const img = await Assets.findOne({
        _id: it.assetsId,
      });
      if (img) {
        images_main.push(img.path);
        images_main_id.push(img.id);
      }
    }
    for await (const it of sub) {
      const img = await assetsService.getOne({
        _id: it.assetsId,
      });
      if (img) {
        images_sub.push(img.path);
        images_sub_id.push(img.id);
      }
    }

    res.json({
      images_main,
      images_sub,
      images_main_id,
      images_sub_id,
    });
  }
};

const updatePatch = async (req: Request, res: Response) => {
  if (res.locals.ROLE.permission.includes("products-update")) {
    console.log(req.body);

    req.body.updatedBy = res.locals.INFOR_USER.id;

    const productAssets = await ProductAssets.find({
      productId: new ObjectId(req.params.id),
    });

    const listProductAssets = [];
    const listAssets = [];
    for await (const it of productAssets) {
      listAssets.push(it.assetsId);
      listProductAssets.push(new ObjectId(it.id));
    }

    await Assets.deleteMany({
      _id: listAssets,
    });
    await ProductAssets.deleteMany({
      _id: listProductAssets,
    });

    const updateProduct = await productService.update(req.params.id, req.body);
    const updateProductAssets = await productAssetsService.update(
      req.params.id,
      req.body
    );
    const updateProductItem = await productItemService.update(
      req.params.id,
      req.body.bien_the,
      res.locals.INFOR_USER.id
    );

    res.json({
      code: 200,
    });
  } else {
    res.status(503).json({
      code: 503,
    });
  }
};

const trashPatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.body.type && req.body.type == "restore") {
    await Product.updateOne(
      {
        _id: id,
      },
      {
        deleted: false,
        updatedBy: new ObjectId(res.locals.INFOR_USER.id),
        $unset: { deletedBy: "" },
      }
    );
  } else {
    await Product.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
        deletedBy: res.locals.INFOR_USER.id,
      }
    );
  }
  res.json({
    code: 200,
  });
};
const changeStatus = async (req: Request, res: Response) => {
  await Product.updateOne(
    {
      _id: req.params.id,
    },
    req.body
  );
  res.json({
    code: 200,
  });
};

const changeStatusMany = async (req: Request, res: Response) => {
  req.body.id = req.body.id.map((id: string) => new ObjectId(id));
  if (req.body.status == "trash-product") {
    await Product.updateMany(
      {
        _id: req.body.id,
      },
      {
        deleted: true,
      }
    );
  } else if (req.body.status == "active" || req.body.status == "inactive") {
    await Product.updateMany(
      {
        _id: req.body.id,
      },
      {
        status: req.body.status,
      }
    );
  }
  res.json({
    code: 200,
  });
};

const trash = async (req: Request, res: Response) => {
  const find = {
    deleted: true,
  };
  if (req.query.trang_thai) {
    find["status"] = req.query.trang_thai;
  }
  const search = req.query.tim_kiem || "";
  if (typeof search === "string") {
    const findSlug = unidecode(search.trim().replace(/\s+/g, "-"));
    const regexTitle = new RegExp(search, "i");
    const regexSlug = new RegExp(findSlug, "i");
    const regexSlugDb = new RegExp(search.trim().replace(/\s+/g, "-"), "i");
    find["$or"] = [
      {
        title: regexTitle,
      },
      {
        slug: regexSlug,
      },
      {
        slug: regexSlugDb,
      },
    ];
  }

  let pagination: any = {
    current: req.query.trang ? parseInt(req.query.trang as string) : 1,
    limit: req.query.sotrang
      ? req.query.sotrang == "full"
        ? await Product.countDocuments(find)
        : parseInt(req.query.sotrang as string)
      : 5,
  };
  pagination["totalProduct"] = await Product.countDocuments(find);
  pagination["totalPage"] = Math.ceil(
    pagination["totalProduct"] / pagination.limit
  );
  if (pagination.current > pagination.totalPage) pagination.current = 1;
  pagination["skip"] = (pagination.current - 1) * pagination.limit;
  const products = await Product.find(find)
    .lean()
    .sort({
      position: -1,
    })
    .limit(pagination["limit"])
    .skip(pagination["skip"]);
  for await (const it of products) {
    const productItem = await productItemService.get({
      productId: it["_id"],
    });
    if (productItem.length > 0) {
      it["priceNew"] = await productItem.map((item) =>
        Math.ceil(item.price - item.price * (item.discount / 100))
      );
    }
    const author = await accountsService.get({
      _id: it.createdBy,
    });
    if (author.length > 0) it["author"] = author[0]["fullname"];

    const productAssets = await productAssetsService.get({
      productId: it["_id"],
      deleted: false,
    });
    it["images"] = [];
    for await (const element of productAssets) {
      const assets = await assetsService.get({
        _id: element.assetsId,
      });
      it["images"].push(assets[0]);
    }
    const userDelete = await Account.findOne({
      _id: new ObjectId(it["deletedBy"]),
    });
    if (userDelete) it["author_delete"] = userDelete.fullname;
  }

  res.render("admin/pages/products/trash.pug", {
    pageTitle: "Thùng rác sản phẩm",
    pageDesc: "Thùng rác sản phẩm",
    products: products,
    pagination,
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  console.log(req.params);
  await Product.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({
    code: 200,
  });
};

const deleteMany = async (req: Request, res: Response) => {
  const newId = req.body.id.map((id) => new ObjectId(id));
  await Product.deleteMany({
    _id: newId,
  });
  res.json({
    code: 200,
  });
};
export {
  index,
  create,
  createPost,
  update,
  getImage,
  updatePatch,
  trashPatch,
  changeStatus,
  changeStatusMany,
  trash,
  deleteProduct,
  deleteMany,
};
