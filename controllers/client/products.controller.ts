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

export { detail, getSize, getItem };
