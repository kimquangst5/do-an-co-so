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
exports.checkLogin = exports.index = void 0;
const index_service_1 = require("../../services/admin/index.service");
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const index = (req, res) => {
    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Đăng nhập quản trị",
        pageDesc: "Đăng nhập quản trị",
    });
};
exports.index = index;
const checkLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkLogin = yield index_service_1.authService.checkLogin(req.body);
    if (checkLogin) {
        try {
            const user = yield index_service_1.authService.verifyToken(checkLogin.token);
            if (user)
                res.cookie("token", checkLogin.token);
        }
        catch (error) {
            const token = yield index_service_1.authService.createToken(checkLogin.id);
            yield accounts_model_1.default.updateOne({
                _id: checkLogin.id,
            }, {
                token: token,
            });
            res.cookie("token", token);
        }
        res.json({
            code: 200,
        });
    }
    else {
        res.json({
            code: 400,
        });
    }
});
exports.checkLogin = checkLogin;
