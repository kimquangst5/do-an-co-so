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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.get = void 0;
const mongodb_1 = require("mongodb");
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const get = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productItems = yield product_items_model_1.default.find(query);
    return productItems;
});
exports.get = get;
const create = (productId, bien_the, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const listData = JSON.parse(bien_the);
    const result = [];
    listData.forEach((it) => {
        const data = {
            productId: new mongodb_1.ObjectId(productId),
            color: new mongodb_1.ObjectId(it.color),
            size: new mongodb_1.ObjectId(it.size),
            price: parseInt(it.price),
            discount: parseInt(it.discount),
            quantity: parseInt(it.quantity),
            createdBy: new mongodb_1.ObjectId(userId),
            status: it.status,
        };
        result.push(data);
    });
    yield product_items_model_1.default.insertMany(result);
});
exports.create = create;
const update = (productId, bien_the, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const listData = JSON.parse(bien_the);
    const id = listData.filter((it) => it.id).map((it) => it.id);
    yield product_items_model_1.default.deleteMany({
        productId: productId,
        _id: {
            $nin: id,
        },
    });
    try {
        for (var _d = true, listData_1 = __asyncValues(listData), listData_1_1; listData_1_1 = yield listData_1.next(), _a = listData_1_1.done, !_a; _d = true) {
            _c = listData_1_1.value;
            _d = false;
            const it = _c;
            it.color = new mongodb_1.ObjectId(it.color);
            it.size = new mongodb_1.ObjectId(it.size);
            it.productId = new mongodb_1.ObjectId(productId);
            if (it.id) {
                yield product_items_model_1.default.updateOne({
                    _id: it.id,
                }, it);
            }
            else {
                it.productId = new mongodb_1.ObjectId(productId);
                const newPI = new product_items_model_1.default(it);
                yield newPI.save();
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = listData_1.return)) yield _b.call(listData_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
exports.update = update;
