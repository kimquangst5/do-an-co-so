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
exports.create = exports.get = void 0;
const argon2_1 = __importDefault(require("argon2"));
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const mongodb_1 = require("mongodb");
const index_service_1 = require("./index.service");
const get = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield accounts_model_1.default.find(query);
    return account;
});
exports.get = get;
const create = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    data["password"] = yield argon2_1.default.hash(data["password"]);
    data["roles"] = new mongodb_1.ObjectId(data["roles"]);
    data["createdBy"] = new mongodb_1.ObjectId(userId);
    const newAccount = new accounts_model_1.default(data);
    yield newAccount.save();
    data["token"] = yield index_service_1.authService.createToken(newAccount["id"]);
    yield accounts_model_1.default.updateOne({
        _id: newAccount["id"],
    }, {
        token: data["token"],
    });
});
exports.create = create;
