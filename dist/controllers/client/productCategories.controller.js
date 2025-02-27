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
const productsCategories_model_1 = __importDefault(require("../../models/productsCategories.model"));
const mongodb_1 = require("mongodb");
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c, _d, e_2, _e, _f, _g, e_3, _h, _j;
    const { khoanggia, mausac, kichthuoc } = req.query;
    const { slug } = req.params;
    const category = yield productsCategories_model_1.default.findOne({
        slug: slug,
        status: "active",
        deleted: false,
    });
    const subCategory = [];
    if (category && category.id)
        subCategory.push(category.id);
    const getSubCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const sub = yield productsCategories_model_1.default.find({
            parentId: new mongodb_1.ObjectId(id),
            status: "active",
            deleted: false,
        });
        for (const it of sub) {
            subCategory.push(it.id);
            yield getSubCategory(it.id);
        }
    });
    if (category && category.id)
        yield getSubCategory(category.id);
    const findProduct = {
        categoryId: {
            $in: subCategory,
        },
        status: "active",
        deleted: false,
    };
    let sortProduct = {};
    if (typeof req.query.sapxep === "string") {
        const name = req.query.sapxep.split("-")[0];
        const value = req.query.sapxep.split("-")[1];
        if (name == "tensanpham") {
            sortProduct["name"] = value == "tangdan" ? 1 : -1;
        }
        else if (name == "sanpham") {
            sortProduct["position"] = value == "moinhat" ? -1 : 1;
        }
    }
    let products = yield products_model_1.default.find(findProduct).sort(sortProduct);
    const listProduct = [];
    try {
        for (var _k = true, products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), _a = products_1_1.done, !_a; _k = true) {
            _c = products_1_1.value;
            _k = false;
            const it = _c;
            const find = {
                productId: it.id,
            };
            if (mausac) {
                const color = yield colorProduct_model_1.default.findOne({
                    slug: mausac,
                });
                if (color)
                    find["color"] = color.id;
                else
                    find["color"] = it.id;
            }
            if (kichthuoc) {
                const size = yield sizeProduct_model_1.default.findOne({
                    slug: kichthuoc,
                });
                if (size)
                    find["size"] = size.id;
                else
                    find["size"] = it.id;
            }
            const items = yield product_items_model_1.default.findOne(find);
            if (items) {
                if (khoanggia) {
                    let [min, max] = khoanggia.toString().split("-").map(Number);
                    const price = Math.ceil(items.price - items.price * (items.discount / 100));
                    if (price <= max && price >= min)
                        listProduct.push(it);
                }
                else
                    listProduct.push(it);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_k && !_a && (_b = products_1.return)) yield _b.call(products_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var _l = true, listProduct_1 = __asyncValues(listProduct), listProduct_1_1; listProduct_1_1 = yield listProduct_1.next(), _d = listProduct_1_1.done, !_d; _l = true) {
            _f = listProduct_1_1.value;
            _l = false;
            const it = _f;
            it["img_main"] = [];
            const img = yield productAssets_model_1.default.find({
                productId: it.id,
                type: "main",
            });
            if (img.length > 0) {
                try {
                    for (var _m = true, img_1 = (e_3 = void 0, __asyncValues(img)), img_1_1; img_1_1 = yield img_1.next(), _g = img_1_1.done, !_g; _m = true) {
                        _j = img_1_1.value;
                        _m = false;
                        const image = _j;
                        const assets__main = yield assets_model_1.default.findOne({
                            _id: image.assetsId,
                        });
                        it["img_main"].push(assets__main.path);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (!_m && !_g && (_h = img_1.return)) yield _h.call(img_1);
                    }
                    finally { if (e_3) throw e_3.error; }
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
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (!_l && !_d && (_e = listProduct_1.return)) yield _e.call(listProduct_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (typeof req.query.sapxep === "string") {
        const name = req.query.sapxep.split("-")[0];
        const value = req.query.sapxep.split("-")[1];
        if (name == "gia") {
            if (value == "tangdan") {
                listProduct.sort((a, b) => a.priceNew - b.priceNew);
            }
            else
                listProduct.sort((a, b) => b.priceNew - a.priceNew);
        }
    }
    else {
        listProduct.sort((a, b) => b.position - a.position);
    }
    let pagination = {
        current: req.query.trang ? parseInt(req.query.trang) : 1,
        limit: 3,
    };
    pagination["totalProduct"] = listProduct.length;
    pagination["totalPage"] = Math.ceil(pagination["totalProduct"] / pagination.limit);
    if (pagination.current > pagination.totalPage)
        pagination.current = 1;
    pagination["skip"] = (pagination.current - 1) * pagination.limit;
    const paginatedList = listProduct.slice(pagination["skip"], pagination["skip"] + pagination.limit);
    const listColors = yield colorProduct_model_1.default.find({
        status: "active",
    });
    const listSizes = yield sizeProduct_model_1.default.find({
        status: "active",
    });
    res.render("client/pages/productCategories/index.pug", {
        pageTitle: category.name,
        category,
        products: paginatedList,
        listColors,
        listSizes,
        pagination,
    });
});
exports.index = index;
