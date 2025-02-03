"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../constants/enum");
const assetSchema = new mongoose_1.default.Schema({
    filename: {
        type: String,
        trim: true,
    },
    path: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        trim: true,
        lowercase: true,
    },
    format: {
        type: String,
        trim: true,
        lowercase: true,
    },
    size: {
        type: Number,
        trim: true,
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
const Assets = mongoose_1.default.model("Assets", assetSchema);
exports.default = Assets;
