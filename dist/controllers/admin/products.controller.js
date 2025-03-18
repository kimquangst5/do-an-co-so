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
exports.deleteMany = exports.deleteProduct = exports.trash = exports.changeStatusMany = exports.changeStatus = exports.trashPatch = exports.updatePatch = exports.getImage = exports.update = exports.createPost = exports.create = exports.index = void 0;
const index_service_1 = require("../../services/admin/index.service");
const mongodb_1 = require("mongodb");
const products_model_1 = __importDefault(require("../../models/products.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const productsCategories_model_1 = __importDefault(require("../../models/productsCategories.model"));
const createTree_helper_1 = __importDefault(require("../../helpers/createTree.helper"));
const productAssets_model_1 = __importDefault(require("../../models/productAssets.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const unidecode_1 = __importDefault(require("unidecode"));
const console_1 = __importDefault(require("console"));
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    const find = {
        deleted: false,
    };
    if (req.query.trang_thai) {
        find["status"] = req.query.trang_thai;
    }
    const search = req.query.tim_kiem || "";
    if (typeof search === "string") {
        const findSlug = (0, unidecode_1.default)(search.trim().replace(/\s+/g, "-"));
        const regexTitle = new RegExp(search, "i");
        const regexSlug = new RegExp(findSlug, "i");
        const regexSlugDb = new RegExp(search.trim().replace(/\s+/g, "-"), "i");
        find["$or"] = [
            {
                title: regexTitle,
            },
            {
                slug: regexSlug,
            },
            {
                slug: regexSlugDb,
            },
        ];
    }
    let pagination = {
        current: req.query.trang ? parseInt(req.query.trang) : 1,
        limit: req.query.sotrang
            ? req.query.sotrang == "full"
                ? yield products_model_1.default.countDocuments(find)
                : parseInt(req.query.sotrang)
            : 5,
    };
    pagination["totalProduct"] = yield products_model_1.default.countDocuments(find);
    pagination["totalPage"] = Math.ceil(pagination["totalProduct"] / pagination.limit);
    if (pagination.current > pagination.totalPage)
        pagination.current = 1;
    pagination["skip"] = (pagination.current - 1) * pagination.limit;
    const products = yield products_model_1.default.find(find)
        .lean()
        .sort({
        position: -1,
    })
        .limit(pagination["limit"])
        .skip(pagination["skip"]);
    try {
        for (var _g = true, products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), _a = products_1_1.done, !_a; _g = true) {
            _c = products_1_1.value;
            _g = false;
            const it = _c;
            const productItem = yield index_service_1.productItemService.get({
                productId: it["_id"],
            });
            if (productItem.length > 0) {
                it["priceNew"] = yield productItem.map((item) => Math.ceil(item.price - item.price * (item.discount / 100)));
            }
            const author = yield index_service_1.accountsService.get({
                _id: it.createdBy,
            });
            if (author.length > 0)
                it["author"] = author[0]["fullname"];
            const productAssets = yield index_service_1.productAssetsService.get({
                productId: it["_id"],
                deleted: false,
            });
            it["images"] = [];
            try {
                for (var _h = true, productAssets_1 = (e_2 = void 0, __asyncValues(productAssets)), productAssets_1_1; productAssets_1_1 = yield productAssets_1.next(), _d = productAssets_1_1.done, !_d; _h = true) {
                    _f = productAssets_1_1.value;
                    _h = false;
                    const element = _f;
                    const assets = yield index_service_1.assetsService.get({
                        _id: element.assetsId,
                    });
                    it["images"].push(assets[0]);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_h && !_d && (_e = productAssets_1.return)) yield _e.call(productAssets_1);
                }
                finally { if (e_2) throw e_2.error; }
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
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        pageDesc: "Danh sách sản phẩm",
        products: products,
        pagination,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSize = yield index_service_1.sizeProductService.get({
        status: "active",
    });
    const getColor = yield index_service_1.colorProductService.get({
        status: "active",
    });
    const categories = yield productsCategories_model_1.default.find({
        deleted: false,
    });
    const listCategories = (0, createTree_helper_1.default)(categories);
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Thêm sản phẩm",
        pageDesc: "Thêm sản phẩm",
        getSize: getSize,
        getColor: getColor,
        listCategories,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.ROLE.permission.includes("products-create")) {
        const createProduct = yield index_service_1.productService.create(req.body, res.locals.INFOR_USER.id);
        const createProductAssets = yield index_service_1.productAssetsService.create(createProduct.id, req.body);
        const createProductItem = yield index_service_1.productItemService.create(createProduct.id, req.body.bien_the, res.locals.INFOR_USER.id);
        res.json({ code: 200 });
    }
    else {
        res.json({ code: 503 });
    }
});
exports.createPost = createPost;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_model_1.default.findOne({
        _id: req.params.id,
        deleted: false,
    }).lean();
    const productItem = yield index_service_1.productItemService.get({
        productId: products["_id"],
    });
    if (productItem.length > 0) {
        productItem.forEach((it) => __awaiter(void 0, void 0, void 0, function* () {
            it["infoColor"] = yield colorProduct_model_1.default.findOne({
                _id: it.color,
            });
            it["infoSize"] = yield sizeProduct_model_1.default.findOne({
                _id: it.size,
            });
        }));
    }
    try {
        const author = yield index_service_1.accountsService.get({
            _id: products.createdBy,
        });
        if (author)
            products["author"] = author[0]["fullname"];
    }
    catch (error) {
        products["author"] = "Chưa biết";
    }
    try {
        const updatetor = yield index_service_1.accountsService.get({
            _id: products.updatedBy,
        });
        products["updatetor"] = updatetor[0]["fullname"];
    }
    catch (error) { }
    const getSize = yield index_service_1.sizeProductService.get({
        status: "active",
    });
    const getColor = yield index_service_1.colorProductService.get({
        status: "active",
    });
    const categories = yield productsCategories_model_1.default.find({
        deleted: false,
    });
    const listCategories = (0, createTree_helper_1.default)(categories);
    if (products["categoryId"].length > 0)
        products["categories"] = products.categoryId
            .map((id) => id.toString())
            .join(" ");
    res.render("admin/pages/products/update.pug", {
        pageTitle: products.name,
        pageDesc: "Cập nhật sản phẩm",
        products: products,
        getColor,
        getSize,
        productItem,
        listCategories,
    });
});
exports.update = update;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_3, _b, _c, _d, e_4, _e, _f;
    if (res.locals.ROLE.permission.includes("products-update")) {
        const { id } = req.params;
        const productAssets = yield productAssets_model_1.default.find({
            productId: id,
        }).sort({
            position: "asc",
        });
        console_1.default.log(productAssets);
        const main = productAssets.filter((it) => it.type == "main");
        const sub = productAssets.filter((it) => it.type == "sub");
        const images_main = [];
        const images_main_id = [];
        const images_sub = [];
        const images_sub_id = [];
        try {
            for (var _g = true, main_1 = __asyncValues(main), main_1_1; main_1_1 = yield main_1.next(), _a = main_1_1.done, !_a; _g = true) {
                _c = main_1_1.value;
                _g = false;
                const it = _c;
                const img = yield assets_model_1.default.findOne({
                    _id: it.assetsId,
                });
                if (img) {
                    images_main.push(img.path);
                    images_main_id.push(img.id);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = main_1.return)) yield _b.call(main_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _h = true, sub_1 = __asyncValues(sub), sub_1_1; sub_1_1 = yield sub_1.next(), _d = sub_1_1.done, !_d; _h = true) {
                _f = sub_1_1.value;
                _h = false;
                const it = _f;
                const img = yield index_service_1.assetsService.getOne({
                    _id: it.assetsId,
                });
                if (img) {
                    images_sub.push(img.path);
                    images_sub_id.push(img.id);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (!_h && !_d && (_e = sub_1.return)) yield _e.call(sub_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        res.json({
            images_main,
            images_sub,
            images_main_id,
            images_sub_id,
        });
    }
});
exports.getImage = getImage;
const updatePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_5, _b, _c;
    if (res.locals.ROLE.permission.includes("products-update")) {
        console_1.default.log(req.body);
        req.body.updatedBy = res.locals.INFOR_USER.id;
        const productAssets = yield productAssets_model_1.default.find({
            productId: new mongodb_1.ObjectId(req.params.id),
        });
        const listProductAssets = [];
        const listAssets = [];
        try {
            for (var _d = true, productAssets_2 = __asyncValues(productAssets), productAssets_2_1; productAssets_2_1 = yield productAssets_2.next(), _a = productAssets_2_1.done, !_a; _d = true) {
                _c = productAssets_2_1.value;
                _d = false;
                const it = _c;
                listAssets.push(it.assetsId);
                listProductAssets.push(new mongodb_1.ObjectId(it.id));
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = productAssets_2.return)) yield _b.call(productAssets_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        yield assets_model_1.default.deleteMany({
            _id: listAssets,
        });
        yield productAssets_model_1.default.deleteMany({
            _id: listProductAssets,
        });
        const updateProduct = yield index_service_1.productService.update(req.params.id, req.body);
        const updateProductAssets = yield index_service_1.productAssetsService.update(req.params.id, req.body);
        const updateProductItem = yield index_service_1.productItemService.update(req.params.id, req.body.bien_the, res.locals.INFOR_USER.id);
        res.json({
            code: 200,
        });
    }
    else {
        res.status(503).json({
            code: 503,
        });
    }
});
exports.updatePatch = updatePatch;
const trashPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (req.body.type && req.body.type == "restore") {
        yield products_model_1.default.updateOne({
            _id: id,
        }, {
            deleted: false,
            updatedBy: new mongodb_1.ObjectId(res.locals.INFOR_USER.id),
            $unset: { deletedBy: "" },
        });
    }
    else {
        yield products_model_1.default.updateOne({
            _id: id,
        }, {
            deleted: true,
            deletedBy: res.locals.INFOR_USER.id,
        });
    }
    res.json({
        code: 200,
    });
});
exports.trashPatch = trashPatch;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield products_model_1.default.updateOne({
        _id: req.params.id,
    }, req.body);
    res.json({
        code: 200,
    });
});
exports.changeStatus = changeStatus;
const changeStatusMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.id = req.body.id.map((id) => new mongodb_1.ObjectId(id));
    if (req.body.status == "trash-product") {
        yield products_model_1.default.updateMany({
            _id: req.body.id,
        }, {
            deleted: true,
        });
    }
    else if (req.body.status == "active" || req.body.status == "inactive") {
        yield products_model_1.default.updateMany({
            _id: req.body.id,
        }, {
            status: req.body.status,
        });
    }
    res.json({
        code: 200,
    });
});
exports.changeStatusMany = changeStatusMany;
const trash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_6, _b, _c, _d, e_7, _e, _f;
    const find = {
        deleted: true,
    };
    if (req.query.trang_thai) {
        find["status"] = req.query.trang_thai;
    }
    const search = req.query.tim_kiem || "";
    if (typeof search === "string") {
        const findSlug = (0, unidecode_1.default)(search.trim().replace(/\s+/g, "-"));
        const regexTitle = new RegExp(search, "i");
        const regexSlug = new RegExp(findSlug, "i");
        const regexSlugDb = new RegExp(search.trim().replace(/\s+/g, "-"), "i");
        find["$or"] = [
            {
                title: regexTitle,
            },
            {
                slug: regexSlug,
            },
            {
                slug: regexSlugDb,
            },
        ];
    }
    let pagination = {
        current: req.query.trang ? parseInt(req.query.trang) : 1,
        limit: req.query.sotrang
            ? req.query.sotrang == "full"
                ? yield products_model_1.default.countDocuments(find)
                : parseInt(req.query.sotrang)
            : 5,
    };
    pagination["totalProduct"] = yield products_model_1.default.countDocuments(find);
    pagination["totalPage"] = Math.ceil(pagination["totalProduct"] / pagination.limit);
    if (pagination.current > pagination.totalPage)
        pagination.current = 1;
    pagination["skip"] = (pagination.current - 1) * pagination.limit;
    const products = yield products_model_1.default.find(find)
        .lean()
        .sort({
        position: -1,
    })
        .limit(pagination["limit"])
        .skip(pagination["skip"]);
    try {
        for (var _g = true, products_2 = __asyncValues(products), products_2_1; products_2_1 = yield products_2.next(), _a = products_2_1.done, !_a; _g = true) {
            _c = products_2_1.value;
            _g = false;
            const it = _c;
            const productItem = yield index_service_1.productItemService.get({
                productId: it["_id"],
            });
            if (productItem.length > 0) {
                it["priceNew"] = yield productItem.map((item) => Math.ceil(item.price - item.price * (item.discount / 100)));
            }
            const author = yield index_service_1.accountsService.get({
                _id: it.createdBy,
            });
            if (author.length > 0)
                it["author"] = author[0]["fullname"];
            const productAssets = yield index_service_1.productAssetsService.get({
                productId: it["_id"],
                deleted: false,
            });
            it["images"] = [];
            try {
                for (var _h = true, productAssets_3 = (e_7 = void 0, __asyncValues(productAssets)), productAssets_3_1; productAssets_3_1 = yield productAssets_3.next(), _d = productAssets_3_1.done, !_d; _h = true) {
                    _f = productAssets_3_1.value;
                    _h = false;
                    const element = _f;
                    const assets = yield index_service_1.assetsService.get({
                        _id: element.assetsId,
                    });
                    it["images"].push(assets[0]);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (!_h && !_d && (_e = productAssets_3.return)) yield _e.call(productAssets_3);
                }
                finally { if (e_7) throw e_7.error; }
            }
            const userDelete = yield accounts_model_1.default.findOne({
                _id: new mongodb_1.ObjectId(it["deletedBy"]),
            });
            if (userDelete)
                it["author_delete"] = userDelete.fullname;
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (!_g && !_a && (_b = products_2.return)) yield _b.call(products_2);
        }
        finally { if (e_6) throw e_6.error; }
    }
    res.render("admin/pages/products/trash.pug", {
        pageTitle: "Thùng rác sản phẩm",
        pageDesc: "Thùng rác sản phẩm",
        products: products,
        pagination,
    });
});
exports.trash = trash;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console_1.default.log(req.params);
    yield products_model_1.default.deleteOne({
        _id: new mongodb_1.ObjectId(req.params.id),
    });
    res.json({
        code: 200,
    });
});
exports.deleteProduct = deleteProduct;
const deleteMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newId = req.body.id.map((id) => new mongodb_1.ObjectId(id));
    yield products_model_1.default.deleteMany({
        _id: newId,
    });
    res.json({
        code: 200,
    });
});
exports.deleteMany = deleteMany;
