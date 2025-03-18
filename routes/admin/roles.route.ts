import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/roles.controller";
import ROUTERS from "../../constants/routes/index.routes";

router.get(`${ROUTERS.ADMIN.ROLES.INDEX}`, controller.index);
router.get(`${ROUTERS.ADMIN.ROLES.CREATE}`, controller.create);
router.post(`${ROUTERS.ADMIN.ROLES.CREATE}`, controller.createPost);
router.get(`${ROUTERS.ADMIN.ROLES.UPDATE}/:id`, controller.update);
router.patch(`${ROUTERS.ADMIN.ROLES.UPDATE}/:id`, controller.updatePatch);
router.patch(`${ROUTERS.ADMIN.ROLES.TRASH}/:id`, controller.deletePatch);
router.get(`${ROUTERS.ADMIN.ROLES.PERMISSION}`, controller.permission);
router.patch(`${ROUTERS.ADMIN.ROLES.PERMISSION}`, controller.permissionPatch);

export default router;
