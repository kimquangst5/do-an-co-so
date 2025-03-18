"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../constants/enum");
const orderSchema = new mongoose_1.default.Schema({
    inforCustomer: {
        customerId: mongoose_1.default.SchemaTypes.ObjectId,
        fullname: String,
        email: String,
        phone: String,
        address: String,
        city: Number,
        district: Number,
        ward: Number,
        note: String,
    },
    inforProductItem: [
        {
            productItemId: mongoose_1.default.SchemaTypes.ObjectId,
            price: Number,
            discount: Number,
            quantity: Number,
        },
    ],
    shipping_fee: Number,
    type: {
        type: String,
        default: "online",
    },
    status: {
        type: String,
        default: enum_1.STATUS_ORDER.WAIT_CONFIRMATION,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    autoCreate: true,
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
