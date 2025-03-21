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
const products_route_1 = __importDefault(require("./products.route"));
const roles_route_1 = __importDefault(require("./roles.route"));
const account_route_1 = __importDefault(require("./account.route"));
const colorProduct_route_1 = __importDefault(require("./colorProduct.route"));
const sizeProduct_route_1 = __importDefault(require("./sizeProduct.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const productsCategory_route_1 = __importDefault(require("./productsCategory.route"));
const customer_route_1 = __importDefault(require("./customer.route"));
const orders_route_1 = __importDefault(require("./orders.route"));
const path_route_1 = __importDefault(require("./path.route"));
const index_routes_1 = __importDefault(require("../../constants/routes/index.routes"));
const checkLogin_middlewares_1 = __importDefault(require("../../middlewares/admin/checkLogin.middlewares"));
const checkRoute_middlewares_1 = __importDefault(require("../../middlewares/admin/checkRoute.middlewares"));
const index = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(checkRoute_middlewares_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.PRODUCT.PATH}`, checkLogin_middlewares_1.default, products_route_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.PRODUCT_CATEGORY.PATH}`, checkLogin_middlewares_1.default, productsCategory_route_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.ROLES.PATH}`, checkLogin_middlewares_1.default, roles_route_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.ACCOUNT.PATH}`, checkLogin_middlewares_1.default, account_route_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.COLOR_PRODUCT.PATH}`, checkLogin_middlewares_1.default, colorProduct_route_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.SIZE.PATH}`, checkLogin_middlewares_1.default, sizeProduct_route_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.CUSTOMERS.PATH}`, checkLogin_middlewares_1.default, customer_route_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.ORDERS.PATH}`, checkLogin_middlewares_1.default, orders_route_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.PATH.PATH}`, checkLogin_middlewares_1.default, path_route_1.default);
    app.use(`/${index_routes_1.default.ADMIN.AUTH}${index_routes_1.default.ADMIN.LOGIN}`, auth_route_1.default);
});
exports.default = index;
