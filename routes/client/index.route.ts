import { Application } from "express";
import home from "./home.route";
import products from "./products.route";
import customers from "./customers.route";
import carts from "./carts.route";
import checkouts from "./checkout.route";
import productCategory from "./productCategories.route";
import ROUTERS from "../../constants/routes/index.routes";
import checkLogin from "../../middlewares/client/checkLogin.middlewares";
import checkRoute from "../../middlewares/admin/checkRoute.middlewares";

const index = (app: Application) => {
  app.use(checkRoute);
  app.use("/", checkLogin, home);
  app.use(`${ROUTERS.CLIENT.PRODUCT.PATH}`, checkLogin, products);
  app.use(`${ROUTERS.CLIENT.CUSTOMER.PATH}`, checkLogin, customers);
  app.use(`${ROUTERS.CLIENT.CART.PATH}`, checkLogin, carts);
  app.use(`${ROUTERS.CLIENT.CHECKOUT.PATH}`, checkLogin, checkouts);
  app.use(
    `${ROUTERS.CLIENT.PRODUCT_CATEGORY.PATH}`,
    checkLogin,
    productCategory
  );
};

export default index;
