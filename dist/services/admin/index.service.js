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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productItemService = exports.sizeProductService = exports.colorProductService = exports.productAssetsService = exports.assetsService = exports.productService = exports.uploadCloudService = exports.authService = exports.accountsService = exports.rolesService = void 0;
const rolesService = __importStar(require("./roles.service"));
exports.rolesService = rolesService;
const accountsService = __importStar(require("./accounts.service"));
exports.accountsService = accountsService;
const authService = __importStar(require("./auth.service"));
exports.authService = authService;
const uploadCloudService = __importStar(require("./uploadCloud.service"));
exports.uploadCloudService = uploadCloudService;
const productService = __importStar(require("./products.service"));
exports.productService = productService;
const productAssetsService = __importStar(require("./productsAssets.service"));
exports.productAssetsService = productAssetsService;
const assetsService = __importStar(require("./assets.service"));
exports.assetsService = assetsService;
const colorProductService = __importStar(require("./colorProduct.service"));
exports.colorProductService = colorProductService;
const sizeProductService = __importStar(require("./sizeProduct.service"));
exports.sizeProductService = sizeProductService;
const productItemService = __importStar(require("./productItem.service"));
exports.productItemService = productItemService;
