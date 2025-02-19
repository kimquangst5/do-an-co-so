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
exports.deleteItem = exports.decrease = exports.addQuantity = exports.add = exports.index = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const productAssets_model_1 = __importDefault(require("../../models/productAssets.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const mongodb_1 = require("mongodb");
const carts_model_1 = __importDefault(require("../../models/carts.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const carts = yield carts_model_1.default.find({
        customerId: res.locals.INFOR_CUSTOMER,
    });
    carts["totalPrice"] = 0;
    try {
        for (var _d = true, carts_1 = __asyncValues(carts), carts_1_1; carts_1_1 = yield carts_1.next(), _a = carts_1_1.done, !_a; _d = true) {
            _c = carts_1_1.value;
            _d = false;
            const it = _c;
            const productItems = yield product_items_model_1.default.findOne({
                _id: it.productItemId,
            });
            const product = yield products_model_1.default.findOne({
                _id: productItems.productId,
            });
            it["product_name"] = product.name;
            it["slug"] = product.slug;
            const color = yield colorProduct_model_1.default.findOne({
                _id: productItems.color,
            });
            it["product_color"] = color.name;
            const size = yield sizeProduct_model_1.default.findOne({
                _id: productItems.size,
            });
            it["product_size"] = size.name;
            it["price"] = Math.ceil(productItems.price - productItems.price * (productItems.discount / 100));
            it["priceNew"] = Math.ceil(it.quantity *
                (productItems.price -
                    productItems.price * (productItems.discount / 100)));
            carts["totalPrice"] += it["priceNew"];
            const productAsset = yield productAssets_model_1.default.findOne({
                productId: product.id,
            }).sort({
                type: 1,
            });
            const asset = yield assets_model_1.default.findOne({
                _id: productAsset.assetsId,
            });
            it["image"] = asset.path;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = carts_1.return)) yield _b.call(carts_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    res.render("client/pages/carts/index.pug", {
        pageTitle: "Giỏ hàng của bạn",
        pageDesc: "Giỏ hàng của bạn",
        carts: carts,
    });
});
exports.index = index;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const productItem = yield product_items_model_1.default.findOne({
        productId: new mongodb_1.ObjectId(productId),
        color: new mongodb_1.ObjectId(req.body.colorId),
        size: new mongodb_1.ObjectId(req.body.sizeId),
    });
    const cart = yield carts_model_1.default.findOne({
        customerId: new mongodb_1.ObjectId(res.locals.INFOR_CUSTOMER.id),
        productItemId: new mongodb_1.ObjectId(productItem.id),
    });
    if (cart) {
        const newQuantity = cart.quantity + parseInt(req.body.quantity);
        yield carts_model_1.default.updateOne({
            _id: cart.id,
        }, {
            quantity: newQuantity,
        });
    }
    else {
        const newCart = new carts_model_1.default({
            customerId: new mongodb_1.ObjectId(res.locals.INFOR_CUSTOMER.id),
            productItemId: new mongodb_1.ObjectId(productItem.id),
            quantity: parseInt(req.body.quantity),
        });
        yield newCart.save();
    }
    res.json({
        code: 200,
    });
});
exports.add = add;
const addQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield carts_model_1.default.updateOne({
        _id: new mongodb_1.ObjectId(req.body.itemId),
    }, { $inc: { quantity: 1 } });
    res.json({
        code: 200,
    });
});
exports.addQuantity = addQuantity;
const decrease = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield carts_model_1.default.updateOne({ _id: new mongodb_1.ObjectId(req.body.itemId), quantity: { $gt: 1 } }, { $inc: { quantity: -1 } });
    res.json({
        code: 200,
    });
});
exports.decrease = decrease;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield carts_model_1.default.deleteOne({ _id: new mongodb_1.ObjectId(req.params.idItem) });
    res.json({
        code: 200,
    });
});
exports.deleteItem = deleteItem;
