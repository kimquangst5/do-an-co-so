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
const index_routes_1 = __importDefault(require("../../constants/routes/index.routes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const roles_models_1 = __importDefault(require("../../models/roles.models"));
const checkLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siderArray = [
            {
                name: "Tổng quan",
                icon: "grid",
            },
            {
                name: "Bài viết",
                icon: "box",
                childrent: [
                    {
                        name: "Thêm bài viết",
                        icon: "plus-circle",
                    },
                    {
                        name: "Danh sách",
                        icon: "list",
                    },
                    {
                        name: "Danh mục",
                        icon: "columns-gap",
                    },
                ],
            },
            {
                name: "Media",
                icon: "image",
            },
            {
                name: "Sản phẩm",
                icon: "box",
                childrent: [
                    {
                        name: "Thêm sản phẩm",
                        icon: "plus-circle",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.PRODUCT.PATH}${index_routes_1.default.ADMIN.PRODUCT.CREATE}`,
                    },
                    {
                        name: "Danh sách",
                        icon: "list",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.PRODUCT.PATH}${index_routes_1.default.ADMIN.PRODUCT.INDEX}`,
                    },
                    {
                        name: "Danh mục",
                        icon: "columns-gap",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.PRODUCT_CATEGORY.PATH}${index_routes_1.default.ADMIN.PRODUCT_CATEGORY.INDEX}`,
                    },
                    {
                        name: "Màu sắc",
                        icon: "palette",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.COLOR_PRODUCT.PATH}${index_routes_1.default.ADMIN.COLOR_PRODUCT.INDEX}`,
                    },
                    {
                        name: "Kích thước",
                        icon: "rulers",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.SIZE.PATH}${index_routes_1.default.ADMIN.SIZE.INDEX}`,
                    },
                ],
            },
            {
                name: "Tài khoản quản trị",
                icon: "person-plus",
                childrent: [
                    {
                        name: "Thêm tài khoản",
                        icon: "plus-circle",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.ACCOUNT.PATH}${index_routes_1.default.ADMIN.ACCOUNT.CREATE}`,
                    },
                    {
                        name: "Danh sách",
                        icon: "list",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.ACCOUNT.PATH}${index_routes_1.default.ADMIN.ACCOUNT.INDEX}`,
                    },
                ],
            },
            {
                name: "Nhóm quyền",
                icon: "person-lock",
                childrent: [
                    {
                        name: "Thêm nhóm quyền",
                        icon: "plus-circle",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.ROLES.PATH}${index_routes_1.default.ADMIN.ROLES.CREATE}`,
                    },
                    {
                        name: "Danh sách",
                        icon: "list",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.ROLES.PATH}${index_routes_1.default.ADMIN.ROLES.INDEX}`,
                    },
                ],
            }, {
                name: "Khách hàng",
                icon: "person",
                childrent: [
                    {
                        name: "Thêm khách hàng mới",
                        icon: "plus-circle",
                    },
                    {
                        name: "Danh sách",
                        icon: "list",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.CUSTOMERS.PATH}${index_routes_1.default.ADMIN.CUSTOMERS.INDEX}`,
                    },
                ],
            }, {
                name: "Đơn hàng",
                icon: "person",
                childrent: [
                    {
                        name: "Thêm đơn hàng",
                        icon: "plus-circle",
                    },
                    {
                        name: "Danh sách",
                        icon: "list",
                        link: `/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.ORDERS.PATH}${index_routes_1.default.ADMIN.ORDERS.INDEX}`,
                    },
                ],
            },
        ];
        res.locals.siderArray = siderArray;
        if (!req.cookies.token) {
            localStorage.setItem("alert-error", JSON.stringify({
                icon: "error",
                title: "Không tìm thấy tài khoản",
            }));
            res.redirect(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.LOGIN}`);
            return;
        }
        else {
            const user = jsonwebtoken_1.default.verify(req.cookies.token, process.env.JWT_SECRET);
            const INFOR_USER = yield accounts_model_1.default.findById({ _id: user.id }).select("-token -password");
            if (INFOR_USER) {
                res.locals.INFOR_USER = INFOR_USER;
                const role = yield roles_models_1.default.findOne({
                    _id: INFOR_USER.roles,
                });
                res.locals.ROLE = role;
                if (user.id)
                    next();
            }
            else {
                localStorage.setItem("alert-error", JSON.stringify({
                    icon: "error",
                    title: "Không tìm thấy tài khoản",
                }));
                res.redirect(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.LOGIN}`);
            }
        }
    }
    catch (error) {
        res.cookie("closeSession", "true");
        res.redirect(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.LOGIN}`);
        return;
    }
});
exports.default = checkLogin;
