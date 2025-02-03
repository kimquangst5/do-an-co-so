"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    product_id: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
    },
    customer_id: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
    },
    rating: Number,
    content: {
        type: String,
    },
    is_approved: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    autoCreate: true,
});
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
