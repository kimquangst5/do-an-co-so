import { NextFunction, Request, Response } from "express";
import ROUTERS from "../../constants/routes/index.routes";
import jwt from "jsonwebtoken";
import Account from "../../models/accounts.model";
import Role from "../../models/roles.models";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const siderArray = [
      {
        name: "Tổng quan",
        icon: "grid",
      },
      {
        name: "Bài viết",
        icon: "box",
        childrent: [
          {
            name: "Thêm bài viết",
            icon: "plus-circle",
          },
          {
            name: "Danh sách",
            icon: "list",
          },
          {
            name: "Danh mục",
            icon: "columns-gap",
          },
        ],
      },
      {
        name: "Media",
        icon: "image",
      },
      {
        name: "Sản phẩm",
        icon: "box",
        childrent: [
          {
            name: "Thêm sản phẩm",
            icon: "plus-circle",
            link: `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.PRODUCT.PATH}${ROUTERS.ADMIN.PRODUCT.CREATE}`,
          },
          {
            name: "Danh sách",
            icon: "list",
            link: `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.PRODUCT.PATH}${ROUTERS.ADMIN.PRODUCT.INDEX}`,
          },
          {
            name: "Danh mục",
            icon: "columns-gap",
            link: `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.PRODUCT_CATEGORY.PATH}${ROUTERS.ADMIN.PRODUCT_CATEGORY.INDEX}`,
          },
          {
            name: "Màu sắc",
            icon: "palette",
            link: `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.COLOR_PRODUCT.PATH}${ROUTERS.ADMIN.COLOR_PRODUCT.INDEX}`,
          },
          {
            name: "Kích thước",
            icon: "rulers",
            link: `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.SIZE.PATH}${ROUTERS.ADMIN.SIZE.INDEX}`,
          },
        ],
      },
    ];
    res.locals.siderArray = siderArray;
    if (!req.cookies.token) {
      localStorage.setItem(
        "alert-error",
        JSON.stringify({
          icon: "error",
          title: "Không tìm thấy tài khoản",
        })
      );
      res.redirect(`/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.LOGIN}`);
      return;
    } else {
      const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      const INFOR_USER = await Account.findById({ _id: user.id }).select(
        "-token -password"
      );
      if (INFOR_USER) {
        res.locals.INFOR_USER = INFOR_USER;
        const role = await Role.findOne({
          _id: INFOR_USER.roles,
        });
        res.locals.ROLE = role;
        if (user.id) next();
      } else {
        localStorage.setItem(
          "alert-error",
          JSON.stringify({
            icon: "error",
            title: "Không tìm thấy tài khoản",
          })
        );
        res.redirect(`/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.LOGIN}`);
      }
    }
  } catch (error) {
    res.cookie("closeSession", "true");
    res.redirect(`/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.LOGIN}`);
    return;
  }
};

export default checkLogin;
