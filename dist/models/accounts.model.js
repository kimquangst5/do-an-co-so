"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../constants/enum");
const accountsSchema = new mongoose_1.Schema({
    fullname: String,
    roles: mongoose_1.Types.ObjectId,
    usename: String,
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
const Account = (0, mongoose_1.model)("Account", accountsSchema);
exports.default = Account;
