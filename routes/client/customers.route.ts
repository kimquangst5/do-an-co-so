import express from "express";
const router = express.Router();
import * as controller from "../../controllers/client/customers.controller";
import ROUTERS from "../../constants/routes/index.routes";
import * as CustomerValidate from "../../validation/client/customers.validate";

router.get(`${ROUTERS.CLIENT.CUSTOMER.LOGIN}`, controller.login);

router.get(`${ROUTERS.CLIENT.CUSTOMER.REGISTER}`, controller.register);
router.post(
  `${ROUTERS.CLIENT.CUSTOMER.REGISTER}`,
  CustomerValidate.register,
  controller.registerPost
);
router.post(
  `${ROUTERS.CLIENT.CUSTOMER.LOGIN}`,
  CustomerValidate.login,
  controller.loginPost
);
router.get(`${ROUTERS.CLIENT.CUSTOMER.LOGOUT}`, controller.logout);

router.get(`${ROUTERS.CLIENT.CUSTOMER.GOOGLE}`, controller.loginGoogle);
router.get(
  `${ROUTERS.CLIENT.CUSTOMER.GOOGLE_CALLBACK}`,
  controller.loginGoogleCallback
);
router.get(
  `${ROUTERS.CLIENT.CUSTOMER.FORGOT_PASSWORD}`,
  controller.forgotPassword
);

router.post(
  `${ROUTERS.CLIENT.CUSTOMER.FORGOT_PASSWORD}`,
  CustomerValidate.forgotPassword,
  controller.forgotPasswordCreateOTP
);

router.get(
  `${ROUTERS.CLIENT.CUSTOMER.FORGOT_PASSWORD_OTP}`,
  controller.forgotPasswordOtp
);

router.post(
  `${ROUTERS.CLIENT.CUSTOMER.FORGOT_PASSWORD_OTP}`,
  CustomerValidate.forgotPasswordCheckOtp,
  controller.forgotPasswordCheckOtp
);

router.get(
  `${ROUTERS.CLIENT.CUSTOMER.FORGOT_PASSWORD_NEW_PASSWORD}`,
  controller.forgotPasswordNewPassword
);

router.post(
  `${ROUTERS.CLIENT.CUSTOMER.FORGOT_PASSWORD_NEW_PASSWORD}`,
  CustomerValidate.forgotPasswordNewPassword,
  controller.forgotPasswordNewPasswordPost
);

export default router;
