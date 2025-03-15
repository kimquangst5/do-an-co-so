import { NextFunction, Request, Response } from "express";
import argon2 from "argon2";
import Customer from "../../models/customers.model";
import OTP from "../../models/otp.model";
require("dotenv").config();
import { ObjectId } from 'mongodb'

const updatePatch = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  const { fullname, username, email, birthday, phone, genders, status } =
    req.body;
  let errorArray = [];
  if (!fullname) errorArray.push("Họ tên không được để trống!");
  if (!username) errorArray.push("Tên đăng nhập không được để trống!");
  if (!email) errorArray.push("Email không được để trống!");
  //   if (!birthday) errorArray.push("Email không được để trống!");
  //   if (!phone) errorArray.push("Email không được để trống!");
  if (!genders) errorArray.push("Giới tính không được để trống!");
  if (!status) errorArray.push("Trạng thái không được để trống!");
  if (fullname && fullname.trim().length <= 5) errorArray.push("Họ tên quá ngắn!");
  if (username && username.trim().length <= 5) errorArray.push("Tên đăng nhập quá ngắn!");
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email && emailRegex.test(email) == false) errorArray.push("Email không hợp lệ!");
  
  const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  if (phone && phoneRegex.test(phone) == false) 
    errorArray.push("Số điện thoại không hợp lệ!");
  const customerCheckUsername = await Customer.countDocuments({
     _id: {
          $ne: new ObjectId(req.params.id)
     },
     username: username,
     deleted: false
  })
  if(customerCheckUsername > 0) errorArray.push("Tên đăng nhập đã tồn tại!");

  const customerCheckEmail = await Customer.countDocuments({
     _id: {
          $ne: new ObjectId(req.params.id)
     },
     email: email,
     deleted: false
  })
  if(customerCheckEmail > 0) errorArray.push("Email đã tồn tại!");

  const customerCheckPhone = await Customer.countDocuments({
     _id: {
          $ne: new ObjectId(req.params.id)
     },
     phone: phone,
     deleted: false
  })
  if(phone && customerCheckPhone > 0) errorArray.push("Số điện thoại đã tồn tại!");
  
  if (errorArray.length > 0) {
    res.status(400).json({
      message: errorArray.join("\n"),
    });
    return;
  } 
  else next();
};
const deletePatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
  let errorArray = [];
  const customer = await Customer.countDocuments({
    _id: new ObjectId(id),
    deleted: false
  })
  console.log(customer);
  
  if(customer == 0)
    errorArray.push("Không tìm thấy khách hàng!");
  
  if (errorArray.length > 0) {
    res.status(400).json({
      message: errorArray.join("\n"),
    });
    return;
  } else next();
  } catch (error) {
    res.status(400).json({
      message: 'Vui lòng load lại trang',
    });
  }
  
  
}
const createAddress = async (req: Request, res: Response, next: NextFunction) => {
  next()
}
export { updatePatch, deletePatch, createAddress };
