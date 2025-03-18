"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = __importStar(require("../../controllers/client/customers.controller"));
const index_routes_1 = __importDefault(require("../../constants/routes/index.routes"));
const CustomerValidate = __importStar(require("../../validation/client/customers.validate"));
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.LOGIN}`, controller.login);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.REGISTER}`, controller.register);
router.post(`${index_routes_1.default.CLIENT.CUSTOMER.REGISTER}`, CustomerValidate.register, controller.registerPost);
router.post(`${index_routes_1.default.CLIENT.CUSTOMER.LOGIN}`, CustomerValidate.login, controller.loginPost);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.LOGOUT}`, controller.logout);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.GOOGLE}`, controller.loginGoogle);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.GOOGLE_CALLBACK}`, controller.loginGoogleCallback);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.FORGOT_PASSWORD}`, controller.forgotPassword);
router.post(`${index_routes_1.default.CLIENT.CUSTOMER.FORGOT_PASSWORD}`, CustomerValidate.forgotPassword, controller.forgotPasswordCreateOTP);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.FORGOT_PASSWORD_OTP}`, controller.forgotPasswordOtp);
router.post(`${index_routes_1.default.CLIENT.CUSTOMER.FORGOT_PASSWORD_OTP}`, CustomerValidate.forgotPasswordCheckOtp, controller.forgotPasswordCheckOtp);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.FORGOT_PASSWORD_NEW_PASSWORD}`, controller.forgotPasswordNewPassword);
router.post(`${index_routes_1.default.CLIENT.CUSTOMER.FORGOT_PASSWORD_NEW_PASSWORD}`, CustomerValidate.forgotPasswordNewPassword, controller.forgotPasswordNewPasswordPost);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}`, controller.infoCustomer);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}`, controller.infoCustomerUpdateInfor);
router.patch(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}`, CustomerValidate.infoCustomerUpdateInfor, controller.infoCustomerUpdateInforPatch);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_EMAIL}`, controller.infoCustomerUpdateEmail);
router.post(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_EMAIL}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_CREATE_OTP}`, controller.infoCustomerCreateOtp);
router.patch(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_EMAIL}`, CustomerValidate.infoCustomerUpdateEmailPatch, controller.infoCustomerUpdateEmailPatch);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_PHONE}`, controller.infoCustomerUpdatePhone);
router.patch(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_PHONE}`, CustomerValidate.infoCustomerUpdatePhonePatch, controller.infoCustomerUpdatePhonePatch);
router.get(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_PASSWORD}`, controller.infoCustomerUpdatePassword);
router.patch(`${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_INFOR}${index_routes_1.default.CLIENT.CUSTOMER.INFOR_CUSTOMER_UPDATE_PASSWORD}`, CustomerValidate.infoCustomerUpdatePassword, controller.infoCustomerUpdatePasswordPatch);
exports.default = router;
