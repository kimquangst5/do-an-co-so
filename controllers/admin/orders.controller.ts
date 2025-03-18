import { Request, Response } from "express";
import { sizeProductService } from "../../services/admin/index.service";
import Order from "../../models/order.model";

const index = async (req: Request, res: Response) => {
  const orders = await Order.find({
    deleted: false,
  }).sort({
    createdAt: -1,
  });
  for (const it of orders) {
    it["totalPrice"] = 0;
    for (const ele of it["inforProductItem"]) {
      it["totalPrice"] += ele.price - ele.price * (ele.discount / 100);
    }
    it["totalPrice"] += it["shipping_fee"];
  }

  res.render("admin/pages/orders/index.pug", {
    pageTitle: "Đơn hàng",
    orders: orders,
  });
};

export { index };
