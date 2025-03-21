"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pathSchema = new mongoose_1.Schema({
    ADMIN: {},
    CLIENT: {},
}, {
    timestamps: true,
    autoCreate: true,
});
const Path = (0, mongoose_1.model)("Path", pathSchema);
exports.default = Path;
