import { Request, Response } from "express";
import { sizeProductService } from "../../services/admin/index.service";
import Order from "../../models/order.model";

const index = async (req: Request, res: Response) => {
  const orders = await Order.find({
    deleted: false
  }).sort({
    createdAt: -1
  })
  
  res.render('admin/pages/orders/index.pug', {
     pageTitle: 'Đơn hàng',
     orders: orders
  })
};

export { index };
