import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/checkout.controller";
import ROUTERS from "../../constants/routes/index.routes";
import { register, login } from "../../validation/client/customers.validate";
import { addValidate } from "../../validation/client/carts.validate";
import * as CheckoutValidate from "../../validation/client/checkouts.validate";

router.get(`${ROUTERS.CLIENT.CHECKOUT.INDEX}/:username`, controller.index);
router.get(`${ROUTERS.CLIENT.CHECKOUT.SUCCESS}/:username`, controller.success);
router.post(
  `${ROUTERS.CLIENT.CHECKOUT.INDEX}/:username`,
  CheckoutValidate.create,
  controller.create
);

export default router;
