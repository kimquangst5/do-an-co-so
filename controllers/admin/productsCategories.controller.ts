import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import ProductCategory from "../../models/productsCategories.model";
import createTree from "../../helpers/createTree.helper";

const index = async (req: Request, res: Response) => {
  const listCategories = await ProductCategory.find({
    deleted: false,
  });

  const tree = createTree(listCategories);
  res.render("admin/pages/products-categories/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    pageDesc: "Danh mục sản phẩm",
    tree: tree,
  });
};

const create = async (req: Request, res: Response) => {
  const listCategories = await ProductCategory.find({
    deleted: false,
  });

  const tree = createTree(listCategories);

  res.render("admin/pages/products-categories/create.pug", {
    pageTitle: "Thêm danh mục",
    pageDesc: "Thêm danh mục",
    tree,
  });
};

const createPost = async (req: Request, res: Response) => {
  req.body.position = req.body.position
    ? parseInt(req.body.position)
    : (await ProductCategory.countDocuments()) + 1;
  req.body.createdBy = new ObjectId(res.locals.INFOR_USER.id);
  req.body.parentId
    ? (req.body.parentId = new ObjectId(req.body.parentId))
    : req.body;

  const newCaterory = new ProductCategory(req.body);
  await newCaterory.save();
  res.json({
    code: 200,
  });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await ProductCategory.findOne({
    _id: id,
    deleted: false,
  });
  const listCategories = await ProductCategory.find({
    deleted: false,
  });

  const tree = createTree(listCategories);

  res.render("admin/pages/products-categories/update.pug", {
    pageTitle: category.name,
    pageDesc: "Thêm danh mục",
    tree,
    category,
  });
};

const updatePatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.body.position) req.body.position = parseInt(req.body.position);
  else req.body.position = (await ProductCategory.countDocuments()) + 1;
  req.body.parentId
    ? (req.body.parentId = new ObjectId(req.body.parentId))
    : req.body;
  await ProductCategory.updateOne(
    {
      _id: id,
    },
    req.body
  );
  res.json({
    code: 200,
  });
};
const trashPatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await ProductCategory.updateOne(
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

export { index, create, createPost, update, updatePatch, trashPatch };
