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
exports.findOneAndUpdate = exports.deleteMany = exports.get = void 0;
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const get = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const listColor = yield colorProduct_model_1.default.find({});
    return listColor;
});
exports.get = get;
const deleteMany = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const listId = data
        .filter((it) => it.id)
        .map((it) => it.id);
    yield colorProduct_model_1.default.deleteMany({
        _id: {
            $nin: listId,
        },
    });
});
exports.deleteMany = deleteMany;
const findOneAndUpdate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    for (const it of data) {
        if (it.id) {
            yield colorProduct_model_1.default.findOneAndUpdate({ _id: it.id }, { $set: it }, { upsert: true });
        }
        else {
            const newColorProduct = new colorProduct_model_1.default(it);
            yield newColorProduct.save();
        }
    }
});
exports.findOneAndUpdate = findOneAndUpdate;
