import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Role from "../../models/roles.models";
import argon2 from "argon2";
import Account from "../../models/accounts.model";
import { ObjectId } from "mongodb";
// const get = (req: Request, res: Response) => {
//   res.render("admin/pages/accounts/index.pug", {
//     pageTitle: "Danh sách tài khoản quản trị",
//     pageDesc: "Danh sách tài khoản quản trị",
//   });
// };

const checkLogin = async (data: Object) => {
  const info = data["info"];
  const password = data["password"];
  const infoUser = await Account.findOne({
    $or: [
      {
        usename: info,
      },
      {
        email: info,
      },
    ],
  });
  if (!infoUser) return;
  if (await argon2.verify(infoUser["password"], password)) {
    return { id: infoUser["id"], token: infoUser["token"] };
  }
};

const createToken = async (id: String) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN_ACCOUNT_ADMIN }
  );
};

const verifyToken = async (token: String) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
export { checkLogin, createToken, verifyToken };
