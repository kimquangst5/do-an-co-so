import express from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/colorProduct.controller";
import ROUTERS from "../../constants/routes/index.routes";
const router = express.Router();
const upload = multer();

router.get(`${ROUTERS.ADMIN.COLOR_PRODUCT.INDEX}`, controller.index);
router.patch(`${ROUTERS.ADMIN.COLOR_PRODUCT.UPDATE}`, controller.update);

export default router;
