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
exports.review = exports.getItem = exports.getSize = exports.detail = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const productAssets_model_1 = __importDefault(require("../../models/productAssets.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const reviews_model_1 = __importDefault(require("../../models/reviews.model"));
const mongodb_1 = require("mongodb");
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c, _d, e_2, _e, _f, _g, e_3, _h, _j;
    const { slug } = req.params;
    const product = yield products_model_1.default.findOne({
        slug: slug,
        deleted: false,
        status: "active",
    });
    const colors = yield product_items_model_1.default.find({
        productId: product.id,
    });
    product["color"] = [];
    product["size"] = [];
    try {
        for (var _k = true, colors_1 = __asyncValues(colors), colors_1_1; colors_1_1 = yield colors_1.next(), _a = colors_1_1.done, !_a; _k = true) {
            _c = colors_1_1.value;
            _k = false;
            const it = _c;
            const color = yield colorProduct_model_1.default.findOne({
                _id: it.color,
            });
            if (!product["color"].find((it) => it.id == color.id))
                product["color"].push(color);
            const size = yield sizeProduct_model_1.default.findOne({
                _id: it.size,
            });
            if (!product["size"].find((sizeItem) => sizeItem.id == size.id))
                product["size"].push(size);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_k && !_a && (_b = colors_1.return)) yield _b.call(colors_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    product["images"] = [];
    const productAssets = yield productAssets_model_1.default.find({
        productId: product.id
    });
    const img_main = productAssets.filter(it => it.type == 'main');
    const img_sub = productAssets.filter(it => it.type == 'sub');
    try {
        for (var _l = true, img_main_1 = __asyncValues(img_main), img_main_1_1; img_main_1_1 = yield img_main_1.next(), _d = img_main_1_1.done, !_d; _l = true) {
            _f = img_main_1_1.value;
            _l = false;
            const image = _f;
            const images = yield assets_model_1.default.findOne({
                _id: image['assetsId']
            });
            product["images"].push(images);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (!_l && !_d && (_e = img_main_1.return)) yield _e.call(img_main_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var _m = true, img_sub_1 = __asyncValues(img_sub), img_sub_1_1; img_sub_1_1 = yield img_sub_1.next(), _g = img_sub_1_1.done, !_g; _m = true) {
            _j = img_sub_1_1.value;
            _m = false;
            const image = _j;
            const images = yield assets_model_1.default.findOne({
                _id: image['assetsId']
            });
            product["images"].push(images);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (!_m && !_g && (_h = img_sub_1.return)) yield _h.call(img_sub_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    const reviews = res.locals.INFOR_CUSTOMER ? yield reviews_model_1.default.find({
        product_id: product.id,
        customer_id: res.locals.INFOR_CUSTOMER.id,
        is_approved: true
    }) : [];
    res.render("client/pages/products/detail.pug", {
        pageTitle: product.name,
        product: product,
        reviews: reviews
    });
});
exports.detail = detail;
const getSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const product = yield products_model_1.default.findOne({
        slug: slug
    }).select('_id');
    const listItem = yield product_items_model_1.default.find({
        productId: product.id,
        color: req.body.color,
    });
    const listSizes = yield listItem.map(it => String(it.size));
    res.json({
        code: 200,
        listSizes
    });
});
exports.getSize = getSize;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const product = yield products_model_1.default.findOne({
        slug: slug
    });
    const productItems = yield product_items_model_1.default.findOne({
        productId: product.id,
        color: req.body.color,
        size: req.body.size,
    }).lean();
    productItems['priceNew'] = Math.ceil(productItems.price - productItems.price * (productItems.discount / 100));
    const productItem = Object.assign({}, productItems);
    res.json({
        code: 200,
        productItem
    });
});
exports.getItem = getItem;
const review = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reviews = new reviews_model_1.default({
        product_id: new mongodb_1.ObjectId(id),
        customer_id: new mongodb_1.ObjectId(res.locals.INFOR_CUSTOMER.id),
        rating: parseInt(req.body.rating),
        content: req.body.content
    });
    yield reviews.save();
    res.json({
        code: 200
    });
});
exports.review = review;
