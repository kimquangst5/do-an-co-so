import express from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/sizeProduct.controller";
import ROUTERS from "../../constants/routes/index.routes";
const router = express.Router();
const upload = multer();

router.get(`${ROUTERS.ADMIN.SIZE.INDEX}`, controller.index);
router.patch(`${ROUTERS.ADMIN.SIZE.UPDATE}`, controller.update);

export default router;
