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
const roles_models_1 = __importDefault(require("../../models/roles.models"));
const get = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data["deleted"] ? (data["deleted"] = JSON.parse(data["deleted"])) : data;
    const listRole = yield roles_models_1.default.find(data);
    return listRole;
});
exports.get = get;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newRole = new roles_models_1.default(data);
    yield newRole.save();
});
exports.create = create;
