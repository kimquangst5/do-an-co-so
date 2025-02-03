"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../constants/enum");
const productsCategoriesSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
    },
    parentId: {
        type: mongoose_1.default.Schema.Types.Mixed,
        default: "",
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(enum_1.STATUS),
        required: true,
        default: enum_1.STATUS.ACTIVE,
    },
    position: {
        type: Number,
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdBy: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
    },
    deletedBy: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
    autoSearchIndex: true,
});
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const ProductCategory = mongoose_1.default.model("ProductCategory", productsCategoriesSchema);
exports.default = ProductCategory;
