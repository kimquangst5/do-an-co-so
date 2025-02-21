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
exports.trashPatch = exports.updatePatch = exports.update = exports.createPost = exports.create = exports.index = void 0;
const mongodb_1 = require("mongodb");
const productsCategories_model_1 = __importDefault(require("../../models/productsCategories.model"));
const createTree_helper_1 = __importDefault(require("../../helpers/createTree.helper"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCategories = yield productsCategories_model_1.default.find({
        deleted: false,
    });
    const tree = (0, createTree_helper_1.default)(listCategories);
    res.render("admin/pages/products-categories/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        pageDesc: "Danh mục sản phẩm",
        tree: tree,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listCategories = yield productsCategories_model_1.default.find({
        deleted: false,
    });
    const tree = (0, createTree_helper_1.default)(listCategories);
    res.render("admin/pages/products-categories/create.pug", {
        pageTitle: "Thêm danh mục",
        pageDesc: "Thêm danh mục",
        tree,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.position = req.body.position
        ? parseInt(req.body.position)
        : (yield productsCategories_model_1.default.countDocuments()) + 1;
    req.body.createdBy = new mongodb_1.ObjectId(res.locals.INFOR_USER.id);
    req.body.parentId
        ? (req.body.parentId = new mongodb_1.ObjectId(req.body.parentId))
        : req.body;
    const newCaterory = new productsCategories_model_1.default(req.body);
    yield newCaterory.save();
    res.json({
        code: 200,
    });
});
exports.createPost = createPost;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield productsCategories_model_1.default.findOne({
        _id: id,
        deleted: false,
    });
    const listCategories = yield productsCategories_model_1.default.find({
        deleted: false,
    });
    const tree = (0, createTree_helper_1.default)(listCategories);
    res.render("admin/pages/products-categories/update.pug", {
        pageTitle: category.name,
        pageDesc: "Thêm danh mục",
        tree,
        category,
    });
});
exports.update = update;
const updatePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (req.body.position)
        req.body.position = parseInt(req.body.position);
    else
        req.body.position = (yield productsCategories_model_1.default.countDocuments()) + 1;
    req.body.parentId
        ? (req.body.parentId = new mongodb_1.ObjectId(req.body.parentId))
        : req.body;
    yield productsCategories_model_1.default.updateOne({
        _id: id,
    }, req.body);
    res.json({
        code: 200,
    });
});
exports.updatePatch = updatePatch;
const trashPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield productsCategories_model_1.default.updateOne({
        _id: id,
    }, {
        deleted: true,
    });
    res.json({
        code: 200,
    });
});
exports.trashPatch = trashPatch;
