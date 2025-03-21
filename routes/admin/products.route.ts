import express from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/products.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
import Path from "../../models/paths.model";
// import ROUTERS from "../../constants/routes/index.routes";
const router = express.Router();
const upload = multer();

const main = async () => {
  const paths = await Path.find();
  const ROUTERS = paths[0];
  router.get(`${ROUTERS.ADMIN.PRODUCT.INDEX}`, controller.index);
  router.get(`${ROUTERS.ADMIN.PRODUCT.CREATE}`, controller.create);
  router.post(
    `${ROUTERS.ADMIN.PRODUCT.CREATE}`,
    upload.fields([
      { name: "images_main", maxCount: 2 },
      { name: "images_sub", maxCount: 10 },
    ]),
    uploadCloud.multi,
    controller.createPost
  );
  router.get(`${ROUTERS.ADMIN.PRODUCT.UPDATE}/:id`, controller.update);
  router.get(
    `${ROUTERS.ADMIN.PRODUCT.UPDATE}/:id/getImage`,
    controller.getImage
  );
  router.patch(
    `${ROUTERS.ADMIN.PRODUCT.UPDATE}/:id`,
    upload.fields([
      { name: "images_main", maxCount: 2 },
      { name: "images_sub", maxCount: 10 },
    ]),
    uploadCloud.multi,
    controller.updatePatch
  );

  router.patch(`${ROUTERS.ADMIN.PRODUCT.TRASH}/:id`, controller.trashPatch);

  router.patch(
    `${ROUTERS.ADMIN.PRODUCT.CHANGE_STATUS}/:id`,
    controller.changeStatus
  );

  router.patch(
    `${ROUTERS.ADMIN.PRODUCT.CHANGE_STATUS_MANY_PRODUCT}`,
    controller.changeStatusMany
  );

  router.get(`${ROUTERS.ADMIN.PRODUCT.TRASH}`, controller.trash);

  router.delete(
    `${ROUTERS.ADMIN.PRODUCT.DELETE}/:id`,
    controller.deleteProduct
  );

  router.delete(`${ROUTERS.ADMIN.PRODUCT.DELETE_MANY}`, controller.deleteMany);
};
main();
export default router;
