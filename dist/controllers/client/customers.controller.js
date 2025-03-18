"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoCustomerUpdatePasswordPatch = exports.infoCustomerUpdatePassword = exports.infoCustomerUpdatePhonePatch = exports.infoCustomerUpdatePhone = exports.infoCustomerUpdateEmailPatch = exports.infoCustomerCreateOtp = exports.infoCustomerUpdateEmail = exports.infoCustomerUpdateInforPatch = exports.infoCustomerUpdateInfor = exports.infoCustomer = exports.forgotPasswordNewPasswordPost = exports.forgotPasswordNewPassword = exports.forgotPasswordCheckOtp = exports.forgotPasswordOtp = exports.forgotPasswordCreateOTP = exports.forgotPassword = exports.loginGoogleCallback = exports.loginGoogle = exports.logout = exports.loginPost = exports.registerPost = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const customers_model_1 = __importDefault(require("../../models/customers.model"));
const index_routes_1 = __importDefault(require("../../constants/routes/index.routes"));
const axios_1 = __importDefault(require("axios"));
const otp_model_1 = __importDefault(require("../../models/otp.model"));
const console_1 = __importDefault(require("console"));
require("dotenv").config();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/customers/login.pug", {
        pageTitle: "Đăng nhập",
    });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/customers/register.pug", {
        pageTitle: "Đăng ký",
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    data["password"] = yield argon2_1.default.hash(data["password"]);
    const newCustomer = new customers_model_1.default(data);
    yield newCustomer.save();
    const token = yield jsonwebtoken_1.default.sign({
        id: newCustomer.id,
    }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER });
    yield customers_model_1.default.updateOne({
        _id: newCustomer.id,
    }, {
        token: token,
    });
    res.cookie("tokenCustomer", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.json({
        code: 200,
    });
});
exports.registerPost = registerPost;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customers_model_1.default.findOne({
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
        const user = jsonwebtoken_1.default.verify(customer.token, process.env.JWT_SECRET);
    }
    catch (error) {
        const token = yield jsonwebtoken_1.default.sign({
            id: customer.id,
        }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER });
        yield customers_model_1.default.updateOne({
            _id: customer.id,
        }, {
            token: token,
        });
    }
    res.cookie("tokenCustomer", customer.token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.json({
        code: 200,
    });
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("tokenCustomer");
    res.redirect("/");
});
exports.logout = logout;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const loginGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const protocol = req.headers["x-forwarded-proto"] ||
        (req.socket["encrypted"] ? "https" : "http");
    const domain = protocol + "://" + req.headers.host;
    const REDIRECT_URI = `${domain}${index_routes_1.default.CLIENT.CUSTOMER.PATH}${index_routes_1.default.CLIENT.CUSTOMER.GOOGLE_CALLBACK}`;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read`;
    res.redirect(url);
});
exports.loginGoogle = loginGoogle;
const loginGoogleCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const protocol = req.headers["x-forwarded-proto"] ||
        (req.socket["encrypted"] ? "https" : "http");
    const domain = protocol + "://" + req.headers.host;
    const REDIRECT_URI = `${domain}${index_routes_1.default.CLIENT.CUSTOMER.PATH}${index_routes_1.default.CLIENT.CUSTOMER.GOOGLE_CALLBACK}`;
    try {
        const { code } = req.query;
        const { data } = yield axios_1.default.post("https://oauth2.googleapis.com/token", {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
        });
        const { access_token, id_token } = data;
        const { data: profile } = yield axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const { data: peopleInfo } = yield axios_1.default.get("https://people.googleapis.com/v1/people/me?personFields=phoneNumbers,birthdays,genders", {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const userData = {
            fullname: profile.name,
            avatar: profile.picture,
            email: profile.email,
            phone: ((_b = (_a = peopleInfo.phoneNumbers) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value.replace(/\s+/g, "")) || "",
            genders: ((_d = (_c = peopleInfo.genders) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value) || "",
            birthday: ((_f = (_e = peopleInfo.birthdays) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.date)
                ? `${peopleInfo.birthdays[0].date.day}/${peopleInfo.birthdays[0].date.month}/${peopleInfo.birthdays[0].date.year || "N/A"}`
                : "",
        };
        const customer = yield customers_model_1.default.findOne({
            email: userData.email,
        });
        if (customer) {
            try {
                const user = jsonwebtoken_1.default.verify(customer.token, process.env.JWT_SECRET);
            }
            catch (error) {
                const token = yield jsonwebtoken_1.default.sign({
                    id: customer.id,
                }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER });
                yield customers_model_1.default.updateOne({
                    _id: customer.id,
                }, Object.assign(Object.assign({}, userData), { token: token }));
            }
            res.cookie("tokenCustomer", customer.token, {
                maxAge: 2 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
        }
        else {
            userData["username"] = userData.email.split("@")[0];
            const username = yield customers_model_1.default.findOne({
                username: userData["username"],
            });
            if (username) {
                const randomStr = Math.random().toString(36).substring(2, 6);
                userData["username"] = `${userData["username"]}${randomStr}`;
            }
            const newCustomer = new customers_model_1.default(userData);
            yield newCustomer.save();
            const token = yield jsonwebtoken_1.default.sign({
                id: newCustomer.id,
            }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER });
            yield customers_model_1.default.updateOne({
                _id: newCustomer.id,
            }, {
                token: token,
            });
            res.cookie("tokenCustomer", token, {
                maxAge: 2 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
        }
        res.cookie("alert-success", encodeURIComponent("Đăng nhập thành công!"));
        res.redirect("/");
    }
    catch (error) {
        res.redirect("/");
    }
});
exports.loginGoogleCallback = loginGoogleCallback;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/customers/forgot-password.pug", {
        pageTitle: "Quên mật khẩu",
    });
});
exports.forgotPassword = forgotPassword;
const forgotPasswordCreateOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const nodemailer = require("nodemailer");
    const otpGenerator = require("otp-generator");
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
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
    transporter.sendMail(mailOptions, (error, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            res.status(400).json({
                message: "Gửi email không thành công!",
            });
            return;
        }
        else {
            const newOTP = new otp_model_1.default({
                code: parseInt(createOTP),
                email: email,
                expireAt: Date.now() + 3 * 60 * 1000,
            });
            yield newOTP.save();
            res.json({
                code: 200,
                email: email,
            });
        }
    }));
});
exports.forgotPasswordCreateOTP = forgotPasswordCreateOTP;
const forgotPasswordOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    res.render("client/pages/customers/forgot-password-otp.pug", {
        pageTitle: "Quên mật khẩu - OTP",
        email: email,
    });
});
exports.forgotPasswordOtp = forgotPasswordOtp;
const forgotPasswordCheckOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    res.json({
        code: 200,
        email: email,
    });
});
exports.forgotPasswordCheckOtp = forgotPasswordCheckOtp;
const forgotPasswordNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    res.render("client/pages/customers/forgot-password-new-pass.pug", {
        pageTitle: "Quên mật khẩu - Nhập mật khẩu mới",
        email: email,
    });
});
exports.forgotPasswordNewPassword = forgotPasswordNewPassword;
const forgotPasswordNewPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    data["password"] = yield argon2_1.default.hash(data["password"]);
    const newCustomer = yield customers_model_1.default.findOne({
        email: data["email"],
    });
    const token = yield jsonwebtoken_1.default.sign({
        id: newCustomer.id,
    }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER });
    yield customers_model_1.default.updateOne({
        _id: newCustomer.id,
    }, {
        password: data.password,
        token: token,
    });
    res.cookie("tokenCustomer", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.json({
        code: 200,
    });
});
exports.forgotPasswordNewPasswordPost = forgotPasswordNewPasswordPost;
const infoCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/customers/infor.pug", {
        pageTitle: "Thông tin khách hàng",
    });
});
exports.infoCustomer = infoCustomer;
const infoCustomerUpdateInfor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/customers/infor-update.pug", {
        pageTitle: "Cập nhật thông tin khách hàng",
    });
});
exports.infoCustomerUpdateInfor = infoCustomerUpdateInfor;
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
const infoCustomerUpdateInforPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    function convertDateFormat(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }
    req.body.birthday = convertDateFormat(req.body.birthday);
    console_1.default.log(req.body.birthday);
    (req.body.fullname = capitalizeWords(req.body.fullname.trim().replace(/\s+/g, " "))),
        yield customers_model_1.default.updateOne({
            _id: res.locals.INFOR_CUSTOMER.id,
        }, req.body);
    res.json({
        code: 200,
    });
});
exports.infoCustomerUpdateInforPatch = infoCustomerUpdateInforPatch;
const infoCustomerUpdateEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/customers/email-update.pug", {
        pageTitle: "Cập nhật email khách hàng",
    });
});
exports.infoCustomerUpdateEmail = infoCustomerUpdateEmail;
const infoCustomerCreateOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = yield otp_model_1.default.findOne({
        email: res.locals.INFOR_CUSTOMER.email,
    });
    if (otp) {
        res.status(400).json({
            time: otp.expireAt,
        });
        return;
    }
    const email = res.locals.INFOR_CUSTOMER.email;
    console_1.default.log(email);
    const nodemailer = require("nodemailer");
    const otpGenerator = require("otp-generator");
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
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
    transporter.sendMail(mailOptions, (error, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console_1.default.log(error);
            res.status(400).json({
                message: "Gửi email không thành công!",
            });
            return;
        }
        else {
            const newOTP = new otp_model_1.default({
                code: parseInt(createOTP),
                email: email,
                expireAt: Date.now() + 3 * 60 * 1000,
            });
            yield newOTP.save();
            res.json({
                code: 200,
            });
            return;
        }
    }));
});
exports.infoCustomerCreateOtp = infoCustomerCreateOtp;
const infoCustomerUpdateEmailPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    yield customers_model_1.default.updateOne({
        _id: res.locals.INFOR_CUSTOMER.id,
    }, {
        email: email,
    });
    res.json({
        code: 200,
    });
});
exports.infoCustomerUpdateEmailPatch = infoCustomerUpdateEmailPatch;
const infoCustomerUpdatePhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/customers/phone-update.pug", {
        pageTitle: "Cập nhật số điện thoại | Khách hàng",
    });
});
exports.infoCustomerUpdatePhone = infoCustomerUpdatePhone;
const infoCustomerUpdatePhonePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield customers_model_1.default.updateOne({
        _id: res.locals.INFOR_CUSTOMER.id,
    }, {
        phone: req.body.phone,
    });
    res.json({
        code: 200,
    });
});
exports.infoCustomerUpdatePhonePatch = infoCustomerUpdatePhonePatch;
const infoCustomerUpdatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/customers/password-update.pug", {
        pageTitle: "Đổi mật khẩu | Khách hàng",
    });
});
exports.infoCustomerUpdatePassword = infoCustomerUpdatePassword;
const infoCustomerUpdatePasswordPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword } = req.body;
    yield customers_model_1.default.updateOne({
        _id: res.locals.INFOR_CUSTOMER.id,
    }, {
        password: yield argon2_1.default.hash(newPassword),
    });
    res.json({
        code: 200,
    });
});
exports.infoCustomerUpdatePasswordPatch = infoCustomerUpdatePasswordPatch;
