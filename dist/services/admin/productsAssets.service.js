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
const enum_1 = require("../../constants/enum");
const productAssets_model_1 = __importDefault(require("../../models/productAssets.model"));
const get = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const listProAsset = yield productAssets_model_1.default.find(query);
    return listProAsset;
});
exports.get = get;
const create = (productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    if (data.images_main && data.images_main.length > 0) {
        const result = [];
        try {
            for (var _g = true, _h = __asyncValues(data.images_main), _j; _j = yield _h.next(), _a = _j.done, !_a; _g = true) {
                _c = _j.value;
                _g = false;
                const it = _c;
                const data = {
                    productId: new mongodb_1.ObjectId(productId),
                    assetsId: new mongodb_1.ObjectId(it.id),
                    type: enum_1.TYPE_IMAGE.MAIN,
                };
                result.push(data);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = _h.return)) yield _b.call(_h);
            }
            finally { if (e_1) throw e_1.error; }
        }
        yield productAssets_model_1.default.insertMany(result);
    }
    if (data.images_sub && data.images_sub.length > 0) {
        const result = [];
        try {
            for (var _k = true, _l = __asyncValues(data.images_sub), _m; _m = yield _l.next(), _d = _m.done, !_d; _k = true) {
                _f = _m.value;
                _k = false;
                const it = _f;
                const data = {
                    productId: new mongodb_1.ObjectId(productId),
                    assetsId: new mongodb_1.ObjectId(it.id),
                    type: enum_1.TYPE_IMAGE.SUB,
                };
                result.push(data);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_k && !_d && (_e = _l.return)) yield _e.call(_l);
            }
            finally { if (e_2) throw e_2.error; }
        }
        yield productAssets_model_1.default.insertMany(result);
    }
});
exports.create = create;
const update = (productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_3, _b, _c, _d, e_4, _e, _f;
    if (data.images_main && data.images_main.length > 0) {
        const result = [];
        let indexMain = 1;
        try {
            for (var _g = true, _h = __asyncValues(data.images_main.entries()), _j; _j = yield _h.next(), _a = _j.done, !_a; _g = true) {
                _c = _j.value;
                _g = false;
                const [index, it] = _c;
                const data = {
                    productId: new mongodb_1.ObjectId(productId),
                    assetsId: new mongodb_1.ObjectId(it.id),
                    type: enum_1.TYPE_IMAGE.MAIN,
                    position: index + 1
                };
                result.push(data);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = _h.return)) yield _b.call(_h);
            }
            finally { if (e_3) throw e_3.error; }
        }
        yield productAssets_model_1.default.insertMany(result);
    }
    if (data.images_sub && data.images_sub.length > 0) {
        const result = [];
        try {
            for (var _k = true, _l = __asyncValues(data.images_sub.entries()), _m; _m = yield _l.next(), _d = _m.done, !_d; _k = true) {
                _f = _m.value;
                _k = false;
                const [index, it] = _f;
                const data = {
                    productId: new mongodb_1.ObjectId(productId),
                    assetsId: new mongodb_1.ObjectId(it.id),
                    type: enum_1.TYPE_IMAGE.SUB,
                    position: index + 1
                };
                result.push(data);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (!_k && !_d && (_e = _l.return)) yield _e.call(_l);
            }
            finally { if (e_4) throw e_4.error; }
        }
        yield productAssets_model_1.default.insertMany(result);
    }
});
exports.update = update;
