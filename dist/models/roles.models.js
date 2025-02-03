"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../constants/enum");
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
}, {
    timestamps: true,
    autoCreate: true,
});
const Role = (0, mongoose_1.model)("Role", rolesSchema);
exports.default = Role;
