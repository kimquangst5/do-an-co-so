import { Application } from "express";
import home from "./home.route";
import products from "./products.route";
import customers from "./customers.route";
import carts from "./carts.route";
import ROUTERS from "../../constants/routes/index.routes";
import checkLogin from "../../middlewares/client/checkLogin.middlewares";

const index = (app: Application) => {
     app.use("/", checkLogin, home);
     app.use(`${ROUTERS.CLIENT.PRODUCT.PATH}`, checkLogin, products);
     app.use(`${ROUTERS.CLIENT.CUSTOMER.PATH}`, checkLogin, customers);
     app.use(`${ROUTERS.CLIENT.CART.PATH}`, checkLogin, carts);
};

export default index;
