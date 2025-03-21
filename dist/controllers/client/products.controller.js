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
exports.search = exports.getItem = exports.getSize = exports.detail = exports.index = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const mongodb_1 = require("mongodb");
const productAssets_model_1 = __importDefault(require("../../models/productAssets.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const index_routes_1 = __importDefault(require("../../constants/routes/index.routes"));
const unidecode_1 = __importDefault(require("unidecode"));
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
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
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_3, _b, _c, _d, e_4, _e, _f;
    try {
        const { method } = req.params;
        let key = req.query["tu-khoa"].toString();
        const regexTitle = new RegExp(key, "i");
        let keySlug = (0, unidecode_1.default)(key.trim().replace(/\s+/g, "-"));
        const regexSlug = new RegExp(keySlug, "i");
        const find = {
            deleted: false,
            status: "active",
            $or: [
                {
                    name: regexTitle,
                },
                {
                    slug: regexSlug,
                },
            ],
        };
        const products = yield products_model_1.default.find(find).lean();
        const newProduct = [];
        try {
            for (var _g = true, products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), _a = products_1_1.done, !_a; _g = true) {
                _c = products_1_1.value;
                _g = false;
                const it = _c;
                let data = Object.assign({}, it);
                it["img_main"] = [];
                const img = yield productAssets_model_1.default.find({
                    productId: it._id,
                    type: "main",
                });
                if (img.length > 0) {
                    try {
                        for (var _h = true, img_1 = (e_4 = void 0, __asyncValues(img)), img_1_1; img_1_1 = yield img_1.next(), _d = img_1_1.done, !_d; _h = true) {
                            _f = img_1_1.value;
                            _h = false;
                            const image = _f;
                            const assets__main = yield assets_model_1.default.findOne({
                                _id: image.assetsId,
                            });
                            it["img_main"].push(assets__main.path);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (!_h && !_d && (_e = img_1.return)) yield _e.call(img_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                data["img_main"] = it["img_main"];
                const listItem = yield product_items_model_1.default.find({
                    productId: it._id,
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
                    data["priceNew"] = it["priceNew"];
                    data["price"] = it["price"];
                    data["discount"] = it["discount"];
                    data["link"] = `${index_routes_1.default.CLIENT.PRODUCT.PATH}${index_routes_1.default.CLIENT.PRODUCT.DETAIL}/${it["slug"]}`;
                    newProduct.push(data);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = products_1.return)) yield _b.call(products_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (method == "trang") {
            res.render("client/pages/products/search.pug", {
                products,
                key,
            });
        }
        else {
            res.json({
                code: 200,
                products: newProduct,
            });
        }
    }
    catch (error) {
        res.status(400);
    }
});
exports.search = search;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { khoanggia, mausac, kichthuoc } = req.query;
    const findProduct = {
        status: "active",
        deleted: false,
    };
    let sortProduct = {};
    if (typeof req.query.sapxep === "string") {
        const name = req.query.sapxep.split("-")[0];
        const value = req.query.sapxep.split("-")[1];
        if (name === "tensanpham") {
            sortProduct["name"] = value === "tangdan" ? 1 : -1;
        }
        else if (name === "sanpham")
            sortProduct["position"] = value === "moinhat" ? -1 : 1;
    }
    else {
        sortProduct["position"] = -1;
    }
    let products = yield products_model_1.default.find(findProduct).sort(sortProduct);
    const listProduct = [];
    yield Promise.all(products.map((it) => __awaiter(void 0, void 0, void 0, function* () {
        const find = { productId: it.id };
        if (mausac) {
            const color = yield colorProduct_model_1.default.findOne({ slug: mausac });
            find["color"] = color ? color.id : it.id;
        }
        if (kichthuoc) {
            const size = yield sizeProduct_model_1.default.findOne({ slug: kichthuoc });
            find["size"] = size ? size.id : it.id;
        }
        const items = yield product_items_model_1.default.findOne(find);
        if (items) {
            if (khoanggia) {
                const [min, max] = khoanggia.toString().split("-").map(Number);
                const price = Math.ceil(items.price - items.price * (items.discount / 100));
                if (price >= min && price <= max) {
                    listProduct.push(it);
                }
            }
            else if (typeof req.query.sapxep === "string") {
                const name = req.query.sapxep.split("-")[0];
                const value = req.query.sapxep.split("-")[1];
                if (name == "danggiam") {
                    if (value == "true" && items.discount > 0)
                        listProduct.push(it);
                    if (value == "false" && items.discount == 0)
                        listProduct.push(it);
                }
            }
            else {
                listProduct.push(it);
            }
        }
    })));
    yield Promise.all(listProduct.map((it) => __awaiter(void 0, void 0, void 0, function* () {
        it["img_main"] = [];
        const img = yield productAssets_model_1.default.find({ productId: it.id, type: "main" });
        if (img.length > 0) {
            it["img_main"] = yield Promise.all(img.map((image) => __awaiter(void 0, void 0, void 0, function* () {
                const assets__main = yield assets_model_1.default.findOne({ _id: image.assetsId });
                return assets__main.path;
            })));
        }
        const listItem = yield product_items_model_1.default.find({ productId: it.id });
        if (listItem.length > 0) {
            const minItem = listItem.reduce((min, item) => Math.ceil(item.price - item.price * (item.discount / 100)) <
                Math.ceil(min.price - min.price * (min.discount / 100))
                ? item
                : min);
            it["priceNew"] = Math.ceil(minItem.price - minItem.price * (minItem.discount / 100));
            it.price = minItem.price;
            it.discount = minItem.discount;
        }
    })));
    if (typeof req.query.sapxep === "string") {
        const name = req.query.sapxep.split("-")[0];
        const value = req.query.sapxep.split("-")[1];
        if (name === "gia") {
            listProduct.sort((a, b) => value === "tangdan" ? a.priceNew - b.priceNew : b.priceNew - a.priceNew);
        }
    }
    else {
        listProduct.sort((a, b) => b.position - a.position);
    }
    let pagination = {
        current: req.query.trang ? parseInt(req.query.trang) : 1,
        limit: 9,
    };
    pagination["totalProduct"] = listProduct.length;
    pagination["totalPage"] = Math.ceil(pagination["totalProduct"] / pagination.limit);
    if (pagination.current > pagination["totalPage"])
        pagination.current = 1;
    pagination["skip"] = (pagination.current - 1) * pagination.limit;
    const paginatedList = listProduct.slice(pagination["skip"], pagination["skip"] + pagination.limit);
    const listColors = yield colorProduct_model_1.default.find({ status: "active" });
    const listSizes = yield sizeProduct_model_1.default.find({ status: "active" });
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: paginatedList,
        listColors,
        listSizes,
        pagination,
    });
});
exports.index = index;
