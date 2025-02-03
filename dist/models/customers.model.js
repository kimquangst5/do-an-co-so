"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../constants/enum");
const customersSchema = new mongoose_1.Schema({
    fullname: String,
    username: String,
    email: String,
    password: String,
    token: String,
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
const Customer = (0, mongoose_1.model)("Customer", customersSchema);
exports.default = Customer;
