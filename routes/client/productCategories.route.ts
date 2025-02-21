import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/productCategories.controller";
import ROUTERS from "../../constants/routes/index.routes";

router.get(`/:slug`, controller.index);

export default router;
