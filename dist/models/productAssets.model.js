"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../constants/enum");
const productAssetSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Types.ObjectId,
        trim: true,
    },
    assetsId: {
        type: mongoose_1.default.Types.ObjectId,
        trim: true,
    },
    type: {
        type: String,
        trim: true,
        lowercase: true,
    },
    status: {
        type: String,
        enum: Object.values(enum_1.STATUS),
        trim: true,
        default: enum_1.STATUS.ACTIVE,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    position: Number
}, {
    timestamps: true,
    autoCreate: true,
});
const ProductAssets = mongoose_1.default.model("ProductAssets", productAssetSchema);
exports.default = ProductAssets;
