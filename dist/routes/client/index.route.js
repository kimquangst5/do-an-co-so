"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_route_1 = __importDefault(require("./home.route"));
const products_route_1 = __importDefault(require("./products.route"));
const customers_route_1 = __importDefault(require("./customers.route"));
const carts_route_1 = __importDefault(require("./carts.route"));
const checkout_route_1 = __importDefault(require("./checkout.route"));
const productCategories_route_1 = __importDefault(require("./productCategories.route"));
const index_routes_1 = __importDefault(require("../../constants/routes/index.routes"));
const checkLogin_middlewares_1 = __importDefault(require("../../middlewares/client/checkLogin.middlewares"));
const checkRoute_middlewares_1 = __importDefault(require("../../middlewares/admin/checkRoute.middlewares"));
const index = (app) => {
    app.use(checkRoute_middlewares_1.default);
    app.use("/", checkLogin_middlewares_1.default, home_route_1.default);
    app.use(`${index_routes_1.default.CLIENT.PRODUCT.PATH}`, checkLogin_middlewares_1.default, products_route_1.default);
    app.use(`${index_routes_1.default.CLIENT.CUSTOMER.PATH}`, checkLogin_middlewares_1.default, customers_route_1.default);
    app.use(`${index_routes_1.default.CLIENT.CART.PATH}`, checkLogin_middlewares_1.default, carts_route_1.default);
    app.use(`${index_routes_1.default.CLIENT.CHECKOUT.PATH}`, checkLogin_middlewares_1.default, checkout_route_1.default);
    app.use(`${index_routes_1.default.CLIENT.PRODUCT_CATEGORY.PATH}`, checkLogin_middlewares_1.default, productCategories_route_1.default);
};
exports.default = index;
