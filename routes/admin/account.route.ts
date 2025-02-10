import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/accounts.controller";
import ROUTERS from "../../constants/routes/index.routes";

router.get(`${ROUTERS.ADMIN.ACCOUNT.INDEX}`, controller.index);
router.get(`${ROUTERS.ADMIN.ACCOUNT.CREATE}`, controller.create);
router.post(`${ROUTERS.ADMIN.ACCOUNT.CREATE}`, controller.createPost);

export default router;
