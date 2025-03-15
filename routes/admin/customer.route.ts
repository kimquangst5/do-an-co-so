import express from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/customers.controller";
import ROUTERS from "../../constants/routes/index.routes";
import * as CustomerValidate from "../../validation/admin/customers.validate";

const router = express.Router();
const upload = multer();

router.get(`${ROUTERS.ADMIN.CUSTOMERS.INDEX}`, controller.index);

router.get(`${ROUTERS.ADMIN.CUSTOMERS.UPDATE}/:id`, controller.update);
router.patch(`${ROUTERS.ADMIN.CUSTOMERS.UPDATE}/:id`, CustomerValidate.updatePatch, controller.updatePatch);


router.patch(`${ROUTERS.ADMIN.CUSTOMERS.TRASH}/:id`, CustomerValidate.deletePatch, controller.deletePatch);
router.post(`${ROUTERS.ADMIN.CUSTOMERS.CREATE_ADDRESS}/:id`, CustomerValidate.createAddress, controller.createAddress);
router.put(`${ROUTERS.ADMIN.CUSTOMERS.GET_ADDRESS}/:id`, controller.getAddress);
router.patch(`${ROUTERS.ADMIN.CUSTOMERS.UPDATE_ADDRESS_DEFAULT}/:customer/:id`, controller.updateAddressDefault);

export default router;
