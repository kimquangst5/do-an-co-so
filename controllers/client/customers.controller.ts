import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import Customer from "../../models/customers.model";
import ROUTERS from "../../constants/routes/index.routes";
import axios from "axios";
import OTP from "../../models/otp.model";
import console from "console";

require("dotenv").config();
const login = async (req: Request, res: Response) => {
  res.render("client/pages/customers/login.pug", {
    pageTitle: "Đăng nhập",
  });
};

const register = async (req: Request, res: Response) => {
  res.render("client/pages/customers/register.pug", {
    pageTitle: "Đăng ký",
  });
};
const registerPost = async (req: Request, res: Response) => {
  const data = req.body;
  data["password"] = await argon2.hash(data["password"]);
  // data["token"] = await authService.createToken(newAccount["id"]);
  const newCustomer = new Customer(data);
  await newCustomer.save();

  const token = await jwt.sign(
    {
      id: newCustomer.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER }
  );
  await Customer.updateOne(
    {
      _id: newCustomer.id,
    },
    {
      token: token,
    }
  );
  res.cookie("tokenCustomer", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.json({
    code: 200,
  });
};

const loginPost = async (req: Request, res: Response) => {
  const customer = await Customer.findOne({
    $or: [
      {
        email: req.body.username,
      },
      {
        username: req.body.username,
      },
    ],
  });

  try {
    const user = jwt.verify(customer.token, process.env.JWT_SECRET);
  } catch (error) {
    const token = await jwt.sign(
      {
        id: customer.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER }
    );
    await Customer.updateOne(
      {
        _id: customer.id,
      },
      {
        token: token,
      }
    );
  }

  res.cookie("tokenCustomer", customer.token, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.json({
    code: 200,
  });
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("tokenCustomer");
  res.redirect("/");
};

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const loginGoogle = async (req: Request, res: Response) => {
  const protocol =
    req.headers["x-forwarded-proto"] ||
    (req.socket["encrypted"] ? "https" : "http");
  const domain = protocol + "://" + req.headers.host;
  const REDIRECT_URI = `${domain}${ROUTERS.CLIENT.CUSTOMER.PATH}${ROUTERS.CLIENT.CUSTOMER.GOOGLE_CALLBACK}`;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read`;
  res.redirect(url);
};

const loginGoogleCallback = async (req: Request, res: Response) => {
  const protocol =
    req.headers["x-forwarded-proto"] ||
    (req.socket["encrypted"] ? "https" : "http");
  const domain = protocol + "://" + req.headers.host;
  // const REDIRECT_URI = `${domain}${ROUTERS.CLIENT.CUSTOMER.PATH}${ROUTERS.CLIENT.CUSTOMER.GOOGLE_CALLBACK}`;
  const REDIRECT_URI = `${domain}${ROUTERS.CLIENT.CUSTOMER.PATH}${ROUTERS.CLIENT.CUSTOMER.GOOGLE_CALLBACK}`;
  try {
    // Exchange authorization code for access token
    const { code } = req.query;
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { data: peopleInfo } = await axios.get(
      "https://people.googleapis.com/v1/people/me?personFields=phoneNumbers,birthdays,genders",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const userData = {
      fullname: profile.name,
      avatar: profile.picture,
      email: profile.email,
      phone: peopleInfo.phoneNumbers?.[0]?.value.replace(/\s+/g, "") || "",
      genders: peopleInfo.genders?.[0]?.value || "",
      birthday: peopleInfo.birthdays?.[0]?.date
        ? `${peopleInfo.birthdays[0].date.day}/${
            peopleInfo.birthdays[0].date.month
          }/${peopleInfo.birthdays[0].date.year || "N/A"}`
        : "",
    };

    const customer = await Customer.findOne({
      email: userData.email,
    });
    if (customer) {
      try {
        const user = jwt.verify(customer.token, process.env.JWT_SECRET);
      } catch (error) {
        const token = await jwt.sign(
          {
            id: customer.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER }
        );
        await Customer.updateOne(
          {
            _id: customer.id,
          },
          {
            ...userData,
            token: token,
          }
        );
      }

      res.cookie("tokenCustomer", customer.token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } else {
      userData["username"] = userData.email.split("@")[0];
      const username = await Customer.findOne({
        username: userData["username"],
      });
      if (username) {
        const randomStr = Math.random().toString(36).substring(2, 6);
        userData["username"] = `${userData["username"]}${randomStr}`;
      }
      const newCustomer = new Customer(userData);
      await newCustomer.save();
      const token = await jwt.sign(
        {
          id: newCustomer.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER }
      );

      await Customer.updateOne(
        {
          _id: newCustomer.id,
        },
        {
          token: token,
        }
      );
      res.cookie("tokenCustomer", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    }
    res.cookie("alert-success", encodeURIComponent("Đăng nhập thành công!"));

    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  res.render("client/pages/customers/forgot-password.pug", {
    pageTitle: "Quên mật khẩu",
  });
};
const forgotPasswordCreateOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  const nodemailer = require("nodemailer");
  const otpGenerator = require("otp-generator");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: "kimquangst5@gmail.com",
      pass: process.env.PASSWORD_APPLICATION,
    },
  });

  const createOTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const mailOptions = {
    from: "kimquangst5@gmail.com",
    to: email,
    subject: "Quên mật khẩu!",
    text: `Mã xác thực OTP của bạn là ${createOTP}`,
  };

  transporter.sendMail(mailOptions, async (error: any, info: any) => {
    if (error) {
      res.status(400).json({
        message: "Gửi email không thành công!",
      });
      return;
    } else {
      const newOTP = new OTP({
        code: parseInt(createOTP),
        email: email,
        expireAt: Date.now() + 3 * 60 * 1000,
      });
      await newOTP.save();
      res.json({
        code: 200,
        email: email,
      });
    }
  });
};

const forgotPasswordOtp = async (req: Request, res: Response) => {
  const { email } = req.query;

  res.render("client/pages/customers/forgot-password-otp.pug", {
    pageTitle: "Quên mật khẩu - OTP",
    email: email,
  });
};
const forgotPasswordCheckOtp = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  res.json({
    code: 200,
    email: email,
  });
};

const forgotPasswordNewPassword = async (req: Request, res: Response) => {
  const { email } = req.query;
  res.render("client/pages/customers/forgot-password-new-pass.pug", {
    pageTitle: "Quên mật khẩu - Nhập mật khẩu mới",
    email: email,
  });
};

const forgotPasswordNewPasswordPost = async (req: Request, res: Response) => {
  const data = req.body;
  data["password"] = await argon2.hash(data["password"]);
  // data["token"] = await authService.createToken(newAccount["id"]);
  const newCustomer = await Customer.findOne({
    email: data["email"],
  });

  const token = await jwt.sign(
    {
      id: newCustomer.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER }
  );
  await Customer.updateOne(
    {
      _id: newCustomer.id,
    },
    {
      password: data.password,
      token: token,
    }
  );
  res.cookie("tokenCustomer", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.json({
    code: 200,
  });
};

const infoCustomer = async (req: Request, res: Response) => {
  res.render("client/pages/customers/infor.pug", {
    pageTitle: "Thông tin khách hàng",
  });
};
const infoCustomerUpdateInfor = async (req: Request, res: Response) => {
  res.render("client/pages/customers/infor-update.pug", {
    pageTitle: "Cập nhật thông tin khách hàng",
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
const infoCustomerUpdateInforPatch = async (req: Request, res: Response) => {
  function convertDateFormat(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }
  req.body.birthday = convertDateFormat(req.body.birthday);
  console.log(req.body.birthday);
  (req.body.fullname = capitalizeWords(
    req.body.fullname.trim().replace(/\s+/g, " ")
  )),
    await Customer.updateOne(
      {
        _id: res.locals.INFOR_CUSTOMER.id,
      },
      req.body
    );
  res.json({
    code: 200,
  });
};
const infoCustomerUpdateEmail = async (req: Request, res: Response) => {
  res.render("client/pages/customers/email-update.pug", {
    pageTitle: "Cập nhật email khách hàng",
  });
};
const infoCustomerCreateOtp = async (req: Request, res: Response) => {
  const otp = await OTP.findOne({
    email: res.locals.INFOR_CUSTOMER.email,
  });
  if (otp) {
    res.status(400).json({
      time: otp.expireAt,
    });
    return;
  }

  const email = res.locals.INFOR_CUSTOMER.email;
  console.log(email);

  const nodemailer = require("nodemailer");
  const otpGenerator = require("otp-generator");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: "kimquangst5@gmail.com",
      pass: process.env.PASSWORD_APPLICATION,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const createOTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const mailOptions = {
    from: "kimquangst5@gmail.com",
    to: email,
    subject: "Khôi phục mật khẩu!",
    text: `Mã xác thực OTP của bạn là ${createOTP}`,
  };

  transporter.sendMail(mailOptions, async (error: any, info: any) => {
    if (error) {
      console.log(error);

      res.status(400).json({
        message: "Gửi email không thành công!",
      });
      return;
    } else {
      const newOTP = new OTP({
        code: parseInt(createOTP),
        email: email,
        expireAt: Date.now() + 3 * 60 * 1000,
      });
      await newOTP.save();
      res.json({
        code: 200,
      });
      return;
    }
  });
};
const infoCustomerUpdateEmailPatch = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  await Customer.updateOne(
    {
      _id: res.locals.INFOR_CUSTOMER.id,
    },
    {
      email: email,
    }
  );
  res.json({
    code: 200,
  });
};
const infoCustomerUpdatePhone = async (req: Request, res: Response) => {
  res.render("client/pages/customers/phone-update.pug", {
    pageTitle: "Cập nhật số điện thoại | Khách hàng",
  });
};
const infoCustomerUpdatePhonePatch = async (req: Request, res: Response) => {
  await Customer.updateOne(
    {
      _id: res.locals.INFOR_CUSTOMER.id,
    },
    {
      phone: req.body.phone,
    }
  );
  res.json({
    code: 200,
  });
};
const infoCustomerUpdatePassword = async (req: Request, res: Response) => {
  res.render("client/pages/customers/password-update.pug", {
    pageTitle: "Đổi mật khẩu | Khách hàng",
  });
};

const infoCustomerUpdatePasswordPatch = async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  await Customer.updateOne(
    {
      _id: res.locals.INFOR_CUSTOMER.id,
    },
    {
      password: await argon2.hash(newPassword),
    }
  );
  res.json({
    code: 200,
  });
};
export {
  login,
  register,
  registerPost,
  loginPost,
  logout,
  loginGoogle,
  loginGoogleCallback,
  forgotPassword,
  forgotPasswordCreateOTP,
  forgotPasswordOtp,
  forgotPasswordCheckOtp,
  forgotPasswordNewPassword,
  forgotPasswordNewPasswordPost,
  infoCustomer,
  infoCustomerUpdateInfor,
  infoCustomerUpdateInforPatch,
  infoCustomerUpdateEmail,
  infoCustomerCreateOtp,
  infoCustomerUpdateEmailPatch,
  infoCustomerUpdatePhone,
  infoCustomerUpdatePhonePatch,
  infoCustomerUpdatePassword,
  infoCustomerUpdatePasswordPatch,
};
