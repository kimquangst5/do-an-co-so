import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/carts.controller";
import ROUTERS from "../../constants/routes/index.routes";
import { register, login } from "../../validation/client/customers.validate";
import { addValidate } from "../../validation/client/carts.validate";

router.get(`${ROUTERS.CLIENT.CART.INDEX}/:username`, controller.index);

router.patch(`${ROUTERS.CLIENT.CART.INDEX}/:username${ROUTERS.CLIENT.CART.ADD_QUANTITY}`, controller.addQuantity);

router.patch(`${ROUTERS.CLIENT.CART.INDEX}/:username${ROUTERS.CLIENT.CART.DECREASE}`, controller.decrease);

router.delete(`${ROUTERS.CLIENT.CART.INDEX}/:username${ROUTERS.CLIENT.CART.DELETE}/:idItem`, controller.deleteItem);

router.post(`${ROUTERS.CLIENT.CART.ADD}/:productId`, addValidate, controller.add);

export default router;
