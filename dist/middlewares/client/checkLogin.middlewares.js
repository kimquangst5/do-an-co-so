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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customers_model_1 = __importDefault(require("../../models/customers.model"));
const productsCategories_model_1 = __importDefault(require("../../models/productsCategories.model"));
const createTree_helper_1 = __importDefault(require("../../helpers/createTree.helper"));
const carts_model_1 = __importDefault(require("../../models/carts.model"));
const checkLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.cookies["alert-success"] == "xoa-cookie") {
            res.clearCookie("alert-success");
        }
        const categories = yield productsCategories_model_1.default.find({
            deleted: false,
            status: "active",
        });
        const treeCate = (0, createTree_helper_1.default)(categories);
        res.locals.treeCategories = treeCate;
        if (req.cookies.tokenCustomer) {
            const user = jsonwebtoken_1.default.verify(req.cookies.tokenCustomer, process.env.JWT_SECRET);
            const INFOR_USER = yield customers_model_1.default.findById({ _id: user.id }).select("-token ");
            if (INFOR_USER) {
                res.locals.INFOR_CUSTOMER = INFOR_USER;
                const carts = yield carts_model_1.default.countDocuments({
                    customerId: INFOR_USER.id,
                });
                res.locals.CART = carts;
            }
            else {
                res.clearCookie("tokenCustomer");
            }
            next();
        }
        else
            next();
    }
    catch (error) {
        res.clearCookie("tokenCustomer");
        next();
    }
});
exports.default = checkLogin;
