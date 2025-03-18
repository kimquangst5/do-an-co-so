import { NextFunction, Request, Response } from "express";
import argon2 from "argon2";
import Customer from "../../models/customers.model";
import OTP from "../../models/otp.model";
require("dotenv").config();
import { ObjectId } from "mongodb";
import Account from "../../models/accounts.model";

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { fullname, roles, username, email } = req.body;
  let errorArray = [];
  if (!fullname.trim().replace(/\s+/g, " "))
    errorArray.push("Họ tên không được trống");
  if (!roles.trim().replace(/\s+/g, ""))
    errorArray.push("Nhóm quyền không được trống");
  if (!username.trim().replace(/\s+/g, ""))
    errorArray.push("Tên đăng nhập không được trống");
  if (!email.trim().replace(/\s+/g, ""))
    errorArray.push("Email không được trống");

  const checkUsername = await Account.countDocuments({
    _id: {
      $ne: req.params.id,
    },
    usename: username,
  });
  if (checkUsername > 0) errorArray.push("Tên đăng nhập đã tồn tại!");

  const checkEmail = await Account.countDocuments({
    _id: {
      $ne: req.params.id,
    },
    email: email,
  });
  if (checkEmail > 0) errorArray.push("Email đã tồn tại!");
  if (errorArray.length > 0) {
    res.status(400).json({
      message: errorArray.join("\n"),
    });
    return;
  } else next();
};
export { update };
