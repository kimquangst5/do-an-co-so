import { Request, Response } from "express";
import Product from "../../models/products.model";
import ProductAssets from "../../models/productAssets.model";
import Assets from "../../models/assets.model";
import ProductItem from "../../models/product-items.model";
import { ObjectId } from "mongodb";
import Cart from "../../models/carts.model";
import ColorProduct from "../../models/colorProduct.model";
import SizeProduct from "../../models/sizeProduct.model";
import Order from "../../models/order.model";
import { it } from "node:test";

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
  res.render("client/pages/checkouts/index.pug", {
    pageTitle: "Thanh toán đơn hàng",
    pageDesc: "Thanh toán đơn hàng",
    carts: carts,
  });
};
function capitalizeWords(str) {
  str = str.toLowerCase();
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    const firstChar = words[i].charAt(0).toUpperCase();
    const restOfWord = words[i].slice(1);
    words[i] = firstChar + restOfWord;
  }
  return words.join(" ");
}
const create = async (req: Request, res: Response) => {
  let { fullname, email, phone, address, city, district, ward, note, cart } =
    req.body;
  const data = {
    inforCustomer: {
      customerId: new ObjectId(res.locals.INFOR_CUSTOMER.id),
      fullname: capitalizeWords(fullname.trim().replace(/\s+/g, " ")),
      email: email,
      phone: phone,
      address: capitalizeWords(address.trim().replace(/\s+/g, " ")),
      city: parseInt(city),
      district: parseInt(district),
      ward: parseInt(ward),
      note: note.trim().replace(/\s+/g, " "),
    },
    inforProductItem: [],
  };
  let listCartId = [];
  for await (const cartId of cart) {
    listCartId.push(new ObjectId(cartId));
    const cartItem = await Cart.findOne({
      _id: cartId,
    });
    const items = await ProductItem.findOne({
      _id: cartItem.productItemId,
    });
    const dataItem = {
      productItemId: new ObjectId(items.id),
      price: items.price,
      discount: items.discount,
      quantity: cartItem.quantity,
    };
    data.inforProductItem.push(dataItem);
  }

  const newOrder = new Order(data);
  await newOrder.save();

  await Cart.deleteMany({
    _id: listCartId,
  });

  res.json({
    code: 200,
    newOrder: newOrder.id,
  });
};

const success = async (req: Request, res: Response) => {
  const id = req.query["id-don-hang"];
  const order = await Order.findOne({
    _id: id,
  });
  order.inforProductItem["totalPrice"] = 0;

  for await (const it of order.inforProductItem) {
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
    order.inforProductItem["totalPrice"] += it["priceNew"];
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

  res.render("client/pages/checkouts/success.pug", {
    pageTitle: "Đặt đơn thành công",
    pageDesc: "Đặt đơn thành công",
    order: order,
  });
};

export { index, create, success };
