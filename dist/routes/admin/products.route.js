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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controller = __importStar(require("../../controllers/admin/products.controller"));
const uploadCloud = __importStar(require("../../middlewares/admin/uploadCloud.middlewares"));
const paths_model_1 = __importDefault(require("../../models/paths.model"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const paths = yield paths_model_1.default.find();
    const ROUTERS = paths[0];
    router.get(`${ROUTERS.ADMIN.PRODUCT.INDEX}`, controller.index);
    router.get(`${ROUTERS.ADMIN.PRODUCT.CREATE}`, controller.create);
    router.post(`${ROUTERS.ADMIN.PRODUCT.CREATE}`, upload.fields([
        { name: "images_main", maxCount: 2 },
        { name: "images_sub", maxCount: 10 },
    ]), uploadCloud.multi, controller.createPost);
    router.get(`${ROUTERS.ADMIN.PRODUCT.UPDATE}/:id`, controller.update);
    router.get(`${ROUTERS.ADMIN.PRODUCT.UPDATE}/:id/getImage`, controller.getImage);
    router.patch(`${ROUTERS.ADMIN.PRODUCT.UPDATE}/:id`, upload.fields([
        { name: "images_main", maxCount: 2 },
        { name: "images_sub", maxCount: 10 },
    ]), uploadCloud.multi, controller.updatePatch);
    router.patch(`${ROUTERS.ADMIN.PRODUCT.TRASH}/:id`, controller.trashPatch);
    router.patch(`${ROUTERS.ADMIN.PRODUCT.CHANGE_STATUS}/:id`, controller.changeStatus);
    router.patch(`${ROUTERS.ADMIN.PRODUCT.CHANGE_STATUS_MANY_PRODUCT}`, controller.changeStatusMany);
    router.get(`${ROUTERS.ADMIN.PRODUCT.TRASH}`, controller.trash);
    router.delete(`${ROUTERS.ADMIN.PRODUCT.DELETE}/:id`, controller.deleteProduct);
    router.delete(`${ROUTERS.ADMIN.PRODUCT.DELETE_MANY}`, controller.deleteMany);
});
main();
exports.default = router;
