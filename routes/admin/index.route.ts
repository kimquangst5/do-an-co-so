import { Application } from "express";
import products from "./products.route";
import roles from "./roles.route";
import account from "./account.route";
import colorProduct from "./colorProduct.route";
import sizeProduct from "./sizeProduct.route";
import auth from "./auth.route";
import productsCategories from "./productsCategory.route";
import customers from "./customer.route";
import orders from "./orders.route";
import path from "./path.route";
import ROUTERS from "../../constants/routes/index.routes";
import checkLogin from "../../middlewares/admin/checkLogin.middlewares";
import checkRoute from "../../middlewares/admin/checkRoute.middlewares";

const index = async (app: Application) => {
  app.use(checkRoute);
  app.use(
    `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.PRODUCT.PATH}`,
    checkLogin,
    products
  );
  app.use(
    `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.PRODUCT_CATEGORY.PATH}`,
    checkLogin,
    productsCategories
  );
  app.use(
    `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.ROLES.PATH}`,
    checkLogin,
    roles
  );
  app.use(
    `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.ACCOUNT.PATH}`,
    checkLogin,
    account
  );
  app.use(
    `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.COLOR_PRODUCT.PATH}`,
    checkLogin,
    colorProduct
  );
  app.use(
    `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.SIZE.PATH}`,
    checkLogin,
    sizeProduct
  );
  app.use(
    `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.CUSTOMERS.PATH}`,
    checkLogin,
    customers
  );
  app.use(
    `/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.ORDERS.PATH}`,
    checkLogin,
    orders
  );
  app.use(`/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.PATH.PATH}`, checkLogin, path);
  app.use(`/${ROUTERS.ADMIN.AUTH}${ROUTERS.ADMIN.LOGIN}`, auth);
};
export default index;
