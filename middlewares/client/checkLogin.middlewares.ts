import { NextFunction, Request, Response } from "express";
import ROUTERS from "../../constants/routes/index.routes";
import jwt from "jsonwebtoken";
import Role from "../../models/roles.models";
import Customer from "../../models/customers.model";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.cookies["alert-success"] == "xoa-cookie") {
      res.clearCookie("alert-success");
    }
    if (req.cookies.tokenCustomer) {
      const user = jwt.verify(
        req.cookies.tokenCustomer,
        process.env.JWT_SECRET
      );

      const INFOR_USER = await Customer.findById({ _id: user.id }).select(
        "-token -password"
      );
      if (INFOR_USER) {
        res.locals.INFOR_CUSTOMER = INFOR_USER;
      } else {
        res.clearCookie("tokenCustomer");
      }
      next();
    } else next();
  } catch (error) {
    res.clearCookie("tokenCustomer");
    next();
  }
};

export default checkLogin;
