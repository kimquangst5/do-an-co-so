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
exports.login = exports.register = void 0;
const argon2_1 = __importDefault(require("argon2"));
const customers_model_1 = __importDefault(require("../../models/customers.model"));
require('dotenv').config();
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.fullname) {
        res.status(400).json({
            message: 'Chưa nhập Họ tên!'
        });
        return;
    }
    if (data.fullname.length < 6) {
        res.status(400).json({
            message: 'Họ và tên quá ngắn'
        });
        return;
    }
    if (!data.username) {
        res.status(400).json({
            message: 'Chưa nhập tên đăng nhập!'
        });
        return;
    }
    if (data.username.length <= 8) {
        res.status(400).json({
            message: 'Tên đăng nhập quá ngắn'
        });
        return;
    }
    if (!data.email) {
        res.status(400).json({
            message: 'Chưa nhập email!'
        });
        return;
    }
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (emailRegex.test(data.email) == false) {
        res.status(400).json({
            message: 'Email không hợp lệ!'
        });
        return;
    }
    if (!data.password) {
        res.status(400).json({
            message: 'Chưa nhập mật khẩu!'
        });
        return;
    }
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (passwordRegex.test(data.password) == false) {
        res.status(400).json({
            message: 'Mật khẩu không hợp lệ!\nTối thiểu là 8 ký tự.\nÍt nhất một chữ hoa.\nÍt nhất một chữ thường\nÍt nhất một số.\n Ít nhất một ký tự đặc biệt'
        });
        return;
    }
    if (!data.confirmPassword) {
        res.status(400).json({
            message: 'Chưa nhập xác nhận mật khẩu!'
        });
        return;
    }
    if (data.password != data.confirmPassword) {
        res.status(400).json({
            message: 'MK và xác nhận MK không giống!'
        });
        return;
    }
    const checkUsername = yield customers_model_1.default.findOne({
        username: data.username
    });
    if (checkUsername) {
        res.status(400).json({
            message: 'Tên đăng nhập đã tồn tại!'
        });
        return;
    }
    const checkEmail = yield customers_model_1.default.findOne({
        email: data.email
    });
    if (checkEmail) {
        res.status(400).json({
            message: 'Email đã tồn tại!'
        });
        return;
    }
    next();
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.username) {
        res.status(400).json({
            message: 'Chưa nhập tên đăng nhập hoặc email!'
        });
        return;
    }
    if (data.username.length <= 8) {
        res.status(400).json({
            message: 'Tên đăng nhập quá ngắn'
        });
        return;
    }
    if (!data.password) {
        res.status(400).json({
            message: 'Chưa nhập mật khẩu!'
        });
        return;
    }
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (passwordRegex.test(data.password) == false) {
        res.status(400).json({
            message: 'Mật khẩu không hợp lệ!\nTối thiểu là 8 ký tự.\nÍt nhất một chữ hoa.\nÍt nhất một chữ thường\nÍt nhất một số.\n Ít nhất một ký tự đặc biệt'
        });
        return;
    }
    const customer = yield customers_model_1.default.findOne({
        $or: [
            {
                email: req.body.username
            },
            {
                username: req.body.username
            }
        ]
    });
    if (!customer) {
        res.status(400).json({
            message: 'Tên đăng nhập chưa đúng!'
        });
        return;
    }
    else {
        const checkPass = yield argon2_1.default.verify(customer.password, req.body.password);
        if (checkPass == false) {
            res.status(400).json({
                message: 'Mật khẩu chưa đúng!'
            });
            return;
        }
        else
            next();
    }
});
exports.login = login;
