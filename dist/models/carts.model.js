"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../constants/enum");
const cartSchema = new mongoose_1.default.Schema({
    customerId: mongoose_1.default.SchemaTypes.ObjectId,
    productItemId: mongoose_1.default.SchemaTypes.ObjectId,
    quantity: Number,
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
}, {
    timestamps: true,
    autoCreate: true,
});
const Cart = mongoose_1.default.model("Cart", cartSchema);
exports.default = Cart;
