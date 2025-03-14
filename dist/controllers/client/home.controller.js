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
exports.index = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const productAssets_model_1 = __importDefault(require("../../models/productAssets.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    const products = yield products_model_1.default.find({
        deleted: false,
        status: "active",
    })
        .sort({
        position: -1,
    })
        .limit(10);
    try {
        for (var _g = true, products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), _a = products_1_1.done, !_a; _g = true) {
            _c = products_1_1.value;
            _g = false;
            const it = _c;
            it["img_main"] = [];
            const img = yield productAssets_model_1.default.find({
                productId: it.id,
                type: "main",
            });
            if (img.length > 0) {
                try {
                    for (var _h = true, img_1 = (e_2 = void 0, __asyncValues(img)), img_1_1; img_1_1 = yield img_1.next(), _d = img_1_1.done, !_d; _h = true) {
                        _f = img_1_1.value;
                        _h = false;
                        const image = _f;
                        const assets__main = yield assets_model_1.default.findOne({
                            _id: image.assetsId,
                        });
                        it["img_main"].push(assets__main.path);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_h && !_d && (_e = img_1.return)) yield _e.call(img_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            const listItem = yield product_items_model_1.default.find({
                productId: it.id,
            });
            if (listItem.length > 0) {
                if (listItem.length > 1) {
                    const minItem = listItem.reduce((min, item) => {
                        return Math.ceil(item.price * item.discount) <
                            Math.ceil(min.price * min.discount)
                            ? item
                            : min;
                    }, listItem[0]);
                    it["priceNew"] = Math.ceil(minItem.price - minItem.price * (minItem.discount / 100));
                    it.price = minItem.price;
                    it.discount = minItem.discount;
                }
                else {
                    it["priceNew"] = Math.ceil(listItem[0].price - listItem[0].price * (listItem[0].discount / 100));
                    it.price = listItem[0].price;
                    it.discount = listItem[0].discount;
                }
            }
            else {
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_g && !_a && (_b = products_1.return)) yield _b.call(products_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        products,
    });
});
exports.index = index;
