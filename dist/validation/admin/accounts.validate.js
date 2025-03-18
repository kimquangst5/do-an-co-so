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
exports.update = void 0;
require("dotenv").config();
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const checkUsername = yield accounts_model_1.default.countDocuments({
        _id: {
            $ne: req.params.id,
        },
        usename: username,
    });
    if (checkUsername > 0)
        errorArray.push("Tên đăng nhập đã tồn tại!");
    const checkEmail = yield accounts_model_1.default.countDocuments({
        _id: {
            $ne: req.params.id,
        },
        email: email,
    });
    if (checkEmail > 0)
        errorArray.push("Email đã tồn tại!");
    if (errorArray.length > 0) {
        res.status(400).json({
            message: errorArray.join("\n"),
        });
        return;
    }
    else
        next();
});
exports.update = update;
