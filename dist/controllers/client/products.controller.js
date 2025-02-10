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
exports.getItem = exports.getSize = exports.detail = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const mongodb_1 = require("mongodb");
const productAssets_model_1 = __importDefault(require("../../models/productAssets.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const index_routes_1 = __importDefault(require("../../constants/routes/index.routes"));
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    const protocol = req.headers["x-forwarded-proto"] ||
        (req.socket["encrypted"] ? "https" : "http");
    const domain = protocol + "://" + req.headers.host;
    const REDIRECT_URI = `${domain}${index_routes_1.default.CLIENT.CUSTOMER.PATH}${index_routes_1.default.CLIENT.CUSTOMER.GOOGLE_CALLBACK}`;
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
    product["images"] = [];
    try {
        for (var _g = true, colors_1 = __asyncValues(colors), colors_1_1; colors_1_1 = yield colors_1.next(), _a = colors_1_1.done, !_a; _g = true) {
            _c = colors_1_1.value;
            _g = false;
            const it = _c;
            const color = yield colorProduct_model_1.default.findOne({
                _id: it.color,
            });
            if (!product["color"].find((co) => co.id == color.id))
                product["color"].push(color);
            const size = yield sizeProduct_model_1.default.findOne({
                _id: it.size,
            });
            if (size && !product["size"].find((siz) => siz.id == size.id))
                product["size"].push(size);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_g && !_a && (_b = colors_1.return)) yield _b.call(colors_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    const productsAssets = yield productAssets_model_1.default.find({
        productId: product.id,
    }).sort({
        type: 1,
    });
    try {
        for (var _h = true, productsAssets_1 = __asyncValues(productsAssets), productsAssets_1_1; productsAssets_1_1 = yield productsAssets_1.next(), _d = productsAssets_1_1.done, !_d; _h = true) {
            _f = productsAssets_1_1.value;
            _h = false;
            const it = _f;
            const assets = yield assets_model_1.default.findOne({
                _id: it.assetsId,
            });
            product["images"].push(assets);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (!_h && !_d && (_e = productsAssets_1.return)) yield _e.call(productsAssets_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    res.render("client/pages/products/detail.pug", {
        pageTitle: product.name,
        product: product,
        REDIRECT_URI: REDIRECT_URI,
    });
});
exports.detail = detail;
const getSize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const product = yield products_model_1.default.findOne({
        slug: slug,
    });
    const listItems = yield product_items_model_1.default.find({
        productId: new mongodb_1.ObjectId(product.id),
        color: new mongodb_1.ObjectId(req.body.color),
        status: "active",
    });
    const listSizes = [];
    listItems.forEach((it) => {
        if (!listSizes.find((size) => size == it.size.toString())) {
            listSizes.push(it.size.toString());
        }
    });
    res.json({
        code: 200,
        listSizes,
    });
});
exports.getSize = getSize;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { color, size } = req.body;
    const { slug } = req.params;
    const product = yield products_model_1.default.findOne({
        slug: slug,
    });
    const listItems = yield product_items_model_1.default.findOne({
        productId: new mongodb_1.ObjectId(product.id),
        color: new mongodb_1.ObjectId(color),
        size: new mongodb_1.ObjectId(size),
    }).lean();
    const productItem = Object.assign({}, listItems);
    productItem["priceNew"] = Math.ceil(productItem.price - productItem.price * (productItem.discount / 100));
    res.json({
        code: 200,
        productItem: productItem,
    });
});
exports.getItem = getItem;
