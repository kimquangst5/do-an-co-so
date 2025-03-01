"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../constants/enum");
const productsSchema = new mongoose_1.default.Schema({
    categoryId: {
        type: [mongoose_1.default.SchemaTypes.ObjectId],
        required: true,
    },
    name: String,
    slug: { type: String, slug: "name", unique: true },
    description: {
        type: String,
    },
    descriptionShort: {
        type: String,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: Object.values(enum_1.STATUS),
        default: enum_1.STATUS.ACTIVE,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    position: {
        type: Number,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
    },
    updatedBy: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
    },
    deletedBy: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
    },
}, {
    timestamps: true,
    autoCreate: true,
});
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const Product = mongoose_1.default.model("Product", productsSchema);
exports.default = Product;
