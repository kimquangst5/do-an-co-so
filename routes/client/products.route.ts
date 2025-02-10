import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/products.controller";
import ROUTERS from "../../constants/routes/index.routes";
import { review } from "../../validation/client/reviews.validate";

router.get(`${ROUTERS.CLIENT.PRODUCT.DETAIL}/:slug`, controller.detail);

router.put(
  `${ROUTERS.CLIENT.PRODUCT.DETAIL}/:slug/getSize`,
  controller.getSize
);

router.post(
  `${ROUTERS.CLIENT.PRODUCT.DETAIL}/:slug/getItem`,
  controller.getItem
);

// router.post(
//   `${ROUTERS.CLIENT.PRODUCT.DETAIL}/:id${ROUTERS.CLIENT.CUSTOMER.REVIEW}`,
//   review,
//   controller.review
// );

export default router;
