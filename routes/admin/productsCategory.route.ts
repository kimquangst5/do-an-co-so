import express from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/productsCategories.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
import ROUTERS from "../../constants/routes/index.routes";
const router = express.Router();
const upload = multer();

router.get(`${ROUTERS.ADMIN.PRODUCT_CATEGORY.INDEX}`, controller.index);
router.get(`${ROUTERS.ADMIN.PRODUCT_CATEGORY.CREATE}`, controller.create);
router.post(
  `${ROUTERS.ADMIN.PRODUCT_CATEGORY.CREATE}`,
  upload.single("avatar"),
  uploadCloud.single,
  controller.createPost
);
router.get(`${ROUTERS.ADMIN.PRODUCT_CATEGORY.UPDATE}/:id`, controller.update);
router.patch(
  `${ROUTERS.ADMIN.PRODUCT_CATEGORY.UPDATE}/:id`,
  upload.single("avatar"),
  uploadCloud.single,
  controller.updatePatch
);

router.patch(
  `${ROUTERS.ADMIN.PRODUCT_CATEGORY.TRASH}/:id`,
  controller.trashPatch
);

export default router;
