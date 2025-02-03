"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const admin_routes_1 = __importDefault(require("./admin.routes"));
const client_routes_1 = __importDefault(require("./client.routes"));
const ROUTERS = {
    ADMIN: admin_routes_1.default,
    CLIENT: client_routes_1.default,
};
exports.default = ROUTERS;
