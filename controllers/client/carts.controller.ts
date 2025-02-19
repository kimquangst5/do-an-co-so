import { Request, Response } from "express";
import Product from "../../models/products.model";
import ProductAssets from "../../models/productAssets.model";
import Assets from "../../models/assets.model";
import ProductItem from "../../models/product-items.model";
import { ObjectId } from "mongodb";
import Cart from "../../models/carts.model";
import ColorProduct from "../../models/colorProduct.model";
import SizeProduct from "../../models/sizeProduct.model";

const index = async (req: Request, res: Response) => {
  const carts = await Cart.find({
    customerId: res.locals.INFOR_CUSTOMER,
  });

  carts["totalPrice"] = 0;
  for await (const it of carts) {
    const productItems = await ProductItem.findOne({
      _id: it.productItemId,
    });
    const product = await Product.findOne({
      _id: productItems.productId,
    });
    it["product_name"] = product.name;
    it["slug"] = product.slug;

    const color = await ColorProduct.findOne({
      _id: productItems.color,
    });
    it["product_color"] = color.name;

    const size = await SizeProduct.findOne({
      _id: productItems.size,
    });
    it["product_size"] = size.name;
    it["price"] = Math.ceil(
      productItems.price - productItems.price * (productItems.discount / 100)
    );
    it["priceNew"] = Math.ceil(
      it.quantity *
        (productItems.price -
          productItems.price * (productItems.discount / 100))
    );
    carts["totalPrice"] += it["priceNew"];
    const productAsset = await ProductAssets.findOne({
      productId: product.id,
    }).sort({
      type: 1,
    });
    const asset = await Assets.findOne({
      _id: productAsset.assetsId,
    });
    it["image"] = asset.path;
  }
  res.render("client/pages/carts/index.pug", {
    pageTitle: "Giỏ hàng của bạn",
    pageDesc: "Giỏ hàng của bạn",
    carts: carts,
  });
};

const add = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const productItem = await ProductItem.findOne({
    productId: new ObjectId(productId),
    color: new ObjectId(req.body.colorId),
    size: new ObjectId(req.body.sizeId),
  });

  const cart = await Cart.findOne({
    customerId: new ObjectId(res.locals.INFOR_CUSTOMER.id),
    productItemId: new ObjectId(productItem.id),
  });
  if (cart) {
    const newQuantity = cart.quantity + parseInt(req.body.quantity);

    await Cart.updateOne(
      {
        _id: cart.id,
      },
      {
        quantity: newQuantity,
      }
    );
  } else {
    const newCart = new Cart({
      customerId: new ObjectId(res.locals.INFOR_CUSTOMER.id),
      productItemId: new ObjectId(productItem.id),
      quantity: parseInt(req.body.quantity),
    });
    await newCart.save();
  }

  res.json({
    code: 200,
  });
};

const addQuantity = async (req: Request, res: Response) => {
  await Cart.updateOne(
    {
      _id: new ObjectId(req.body.itemId),
    },
    { $inc: { quantity: 1 } }
  );
  res.json({
    code: 200,
  });
};

const decrease = async (req: Request, res: Response) => {
  await Cart.updateOne(
    { _id: new ObjectId(req.body.itemId), quantity: { $gt: 1 } }, // Chỉ update nếu quantity > 1
    { $inc: { quantity: -1 } }
  );

  res.json({
    code: 200,
  });
};

const deleteItem = async (req: Request, res: Response) => {
  await Cart.deleteOne({ _id: new ObjectId(req.params.idItem) });
  res.json({
    code: 200,
  });
};
export { index, add, addQuantity, decrease, deleteItem };
