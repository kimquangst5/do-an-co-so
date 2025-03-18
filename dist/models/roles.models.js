"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../constants/enum");
const mongoose_2 = __importDefault(require("mongoose"));
const rolesSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    permission: Array,
    deleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: enum_1.STATUS.ACTIVE,
    },
    createdBy: mongoose_2.default.SchemaTypes.ObjectId,
    deletedBy: mongoose_2.default.SchemaTypes.ObjectId,
}, {
    timestamps: true,
    autoCreate: true,
});
const Role = (0, mongoose_1.model)("Role", rolesSchema);
exports.default = Role;
