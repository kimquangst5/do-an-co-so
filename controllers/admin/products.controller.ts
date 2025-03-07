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
    limit: 3,
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

  const selectConfig = {
    hasSearch: true,
    searchPlaceholder: "Search...",
    searchClasses:
      "block w-full text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3",
    searchWrapperClasses: "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
    placeholder: "Select country...",
    toggleTag:
      '<button type="button" aria-expanded="false"><span class="me-2" data-icon></span><span class="text-gray-800 dark:text-neutral-200 " data-title></span></button>',
    toggleClasses:
      "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
    dropdownClasses:
      "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
    optionClasses:
      "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
    optionTemplate:
      '<div><div class="flex items-center"><div class="me-2" data-icon></div><div class="text-gray-800 dark:text-neutral-200 " data-title></div></div></div>',
    extraMarkup:
      '<div class="absolute top-1/2 end-3 -translate-y-1/2"><svg class="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg></div>',
  };

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    pageDesc: "Danh sách sản phẩm",
    products: products,
    pagination,
    selectConfig,
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
  await Product.updateOne(
    {
      _id: id,
    },
    {
      deleted: true,
    }
  );
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
};
