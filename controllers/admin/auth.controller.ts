import { Request, Response } from "express";
import { authService } from "../../services/admin/index.service";
import jwt from "jsonwebtoken";
import Account from "../../models/accounts.model";

const index = (req: Request, res: Response) => {
  res.render("admin/pages/auth/login.pug", {
    pageTitle: "Đăng nhập quản trị",
    pageDesc: "Đăng nhập quản trị",
  });
};

const checkLogin = async (req: Request, res: Response) => {
  const checkLogin = await authService.checkLogin(req.body);

  if (checkLogin) {
    try {
      const user = await authService.verifyToken(checkLogin.token);
      if (user) res.cookie("token", checkLogin.token);
    } catch (error) {
      const token = await authService.createToken(checkLogin.id);
      await Account.updateOne(
        {
          _id: checkLogin.id,
        },
        {
          token: token,
        }
      );
      res.cookie("token", token);
    }
    res.json({
      code: 200,
    });
  } else {
    res.json({
      code: 400,
    });
  }
};
export { index, checkLogin };
