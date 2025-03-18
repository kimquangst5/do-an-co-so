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

router.get(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}`,
  controller.infoCustomer
);

router.get(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}`,
  controller.infoCustomerUpdateInfor
);

router.patch(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}`,
  CustomerValidate.infoCustomerUpdateInfor,
  controller.infoCustomerUpdateInforPatch
);

router.get(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_EMAIL}`,
  controller.infoCustomerUpdateEmail
);

router.post(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_EMAIL}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_CREATE_OTP}`,
  controller.infoCustomerCreateOtp
);

router.patch(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_EMAIL}`,
  CustomerValidate.infoCustomerUpdateEmailPatch,
  controller.infoCustomerUpdateEmailPatch
);

router.get(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_PHONE}`,
  controller.infoCustomerUpdatePhone
);

router.patch(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_PHONE}`,
  CustomerValidate.infoCustomerUpdatePhonePatch,
  controller.infoCustomerUpdatePhonePatch
);

router.get(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_PASSWORD}`,
  controller.infoCustomerUpdatePassword
);

router.patch(
  `${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${ROUTERS.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_PASSWORD}`,
  CustomerValidate.infoCustomerUpdatePassword,
  controller.infoCustomerUpdatePasswordPatch
);

export default router;
