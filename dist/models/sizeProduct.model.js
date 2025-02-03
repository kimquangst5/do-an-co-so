"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../constants/enum");
const sizeProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
    },
    slug: { type: String, slug: "name", unique: true },
    status: {
        type: String,
        enum: Object.values(enum_1.STATUS),
        trim: true,
        default: enum_1.STATUS.ACTIVE,
    },
    createdBy: {
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
const SizeProduct = mongoose_1.default.model("SizeProduct", sizeProductSchema);
exports.default = SizeProduct;
