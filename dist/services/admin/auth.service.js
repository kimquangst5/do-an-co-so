"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = exports.checkLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const checkLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const info = data["info"];
    const password = data["password"];
    const infoUser = yield accounts_model_1.default.findOne({
        $or: [
            {
                usename: info,
            },
            {
                email: info,
            },
        ],
    });
    if (!infoUser)
        return;
    if (yield argon2_1.default.verify(infoUser["password"], password)) {
        return { id: infoUser["id"], token: infoUser["token"] };
    }
});
exports.checkLogin = checkLogin;
const createToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({
        id: id,
    }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN_ACCOUNT_ADMIN });
});
exports.createToken = createToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
});
exports.verifyToken = verifyToken;
