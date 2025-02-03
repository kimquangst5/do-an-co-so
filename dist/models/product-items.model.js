"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../constants/enum");
const productItemSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
    },
    color: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
    },
    size: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
    },
    price: Number,
    discount: Number,
    quantity: Number,
    status: {
        type: String,
        enum: Object.values(enum_1.STATUS),
        default: enum_1.STATUS.ACTIVE,
    },
    position: {
        type: Number,
    },
}, {
    timestamps: true,
    autoCreate: true,
});
const ProductItem = mongoose_1.default.model("ProductItem", productItemSchema);
exports.default = ProductItem;
