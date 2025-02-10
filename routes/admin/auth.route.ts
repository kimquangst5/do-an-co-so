import express from "express";
const router = express.Router();
import * as controller from "../../controllers/admin/auth.controller";

router.get(`/`, controller.index);

router.post(`/`, controller.checkLogin);

export default router;
