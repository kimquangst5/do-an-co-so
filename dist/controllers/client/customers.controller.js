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
exports.logout = exports.loginPost = exports.registerPost = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const customers_model_1 = __importDefault(require("../../models/customers.model"));
require('dotenv').config();
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
        _id: newCustomer.id
    }, {
        token: token
    });
    res.cookie('tokenCustomer', token, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json({
        code: 200
    });
});
exports.registerPost = registerPost;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customers_model_1.default.findOne({
        $or: [
            {
                email: req.body.username
            }, {
                username: req.body.username
            }
        ]
    });
    try {
        const user = jsonwebtoken_1.default.verify(customer.token, process.env.JWT_SECRET);
    }
    catch (error) {
        const token = yield jsonwebtoken_1.default.sign({
            id: customer.id,
        }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_ACCOUNT_CUSTOMER });
        yield customers_model_1.default.updateOne({
            _id: customer.id
        }, {
            token: token
        });
    }
    res.cookie('tokenCustomer', customer.token, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json({
        code: 200
    });
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('tokenCustomer');
    res.redirect('/');
});
exports.logout = logout;
