import { Request, Response } from "express";
import Product from "../../models/products.model";
import ProductAssets from "../../models/productAssets.model";
import Assets from "../../models/assets.model";
import ProductItem from "../../models/product-items.model";

const index = async (req: Request, res: Response) => {
  // const protocol = req.socket["encrypted"] ? "https" : "http";
  // const domain = protocol + "://" + req;
  // console.log(req);

  const products = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({
      position: -1,
    })
    .limit(10);
  for await (const it of products) {
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

  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    products,
  });
};

export { index };
