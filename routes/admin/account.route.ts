import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/accounts.controller";
import * as AccountValidate from "../../validation/admin/accounts.validate";
import ROUTERS from "../../constants/routes/index.routes";

router.get(`${ROUTERS.ADMIN.ACCOUNT.INDEX}`, controller.index);
router.get(`${ROUTERS.ADMIN.ACCOUNT.CREATE}`, controller.create);
router.post(`${ROUTERS.ADMIN.ACCOUNT.CREATE}`, controller.createPost);
router.get(`${ROUTERS.ADMIN.ACCOUNT.UPDATE}/:id`, controller.update);
router.patch(
  `${ROUTERS.ADMIN.ACCOUNT.UPDATE}/:id`,
  AccountValidate.update,
  controller.updatePatch
);
router.patch(
  `${ROUTERS.ADMIN.ACCOUNT.UPDATE}/:id`,
  AccountValidate.update,
  controller.updatePatch
);
router.patch(`${ROUTERS.ADMIN.ACCOUNT.TRASH}/:id`, controller.deletePatch);

export default router;
