import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import Customer from "../../models/customers.model";
require('dotenv').config()

const review = async (req: Request, res: Response, next: NextFunction) => {
     const data = req.body
     if (!res.locals.INFOR_CUSTOMER) {
          res.status(400).json({
               message: 'Vui lòng đăng nhập để đánh giá!'
          })
          return;
     }
     if (!data.content) {
          res.status(400).json({
               message: 'Vui lòng viết nhận xét!'
          })
          return;
     }
     if (data.content.length < 20) {
          res.status(400).json({
               message: 'Nhận xét quá ngắn'
          })
          return;
     }
     next()
}

export { review }