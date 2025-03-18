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
exports.deletePatch = exports.update = exports.updatePatch = exports.permissionPatch = exports.permission = exports.createPost = exports.create = exports.index = void 0;
const roles_models_1 = __importDefault(require("../../models/roles.models"));
const index_service_1 = require("../../services/admin/index.service");
const mongodb_1 = require("mongodb");
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_models_1.default.find({
        deleted: false,
    });
    for (const it of roles) {
        if (it.createdBy) {
            const user = yield accounts_model_1.default.findOne({
                _id: it.createdBy,
            });
            it['author'] = user.fullname;
        }
    }
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Danh sách nhóm quyền",
        pageDesc: "Danh sách nhóm quyền",
        roles: roles,
    });
});
exports.index = index;
const create = (req, res) => {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Thêm nhóm quyền",
        pageDesc: "Thêm nhóm quyền",
    });
};
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.createdBy = new mongodb_1.ObjectId(res.locals.INFOR_USER.id);
    const newRole = index_service_1.rolesService.create(req.body);
    res.json({
        code: 200,
    });
});
exports.createPost = createPost;
const permission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_models_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/roles/permission.pug", {
        pageTitle: "Phân quyền",
        roles: roles,
    });
});
exports.permission = permission;
const permissionPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.forEach((it) => __awaiter(void 0, void 0, void 0, function* () {
        yield roles_models_1.default.updateOne({
            _id: it.roleId,
        }, {
            permission: it.permission,
        });
    }));
    res.json({
        code: 200,
    });
});
exports.permissionPatch = permissionPatch;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const role = yield roles_models_1.default.findOne({
        _id: id,
    });
    res.render("admin/pages/roles/update.pug", {
        pageTitle: role.name,
        pageDesc: role.description,
        role: role,
    });
});
exports.update = update;
const updatePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield roles_models_1.default.updateOne({
        _id: req.params.id,
    }, req.body);
    res.json({
        code: 200,
    });
});
exports.updatePatch = updatePatch;
const deletePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield roles_models_1.default.updateOne({
        _id: new mongodb_1.ObjectId(req.params.id)
    }, {
        deleted: true
    });
    console.log(req.params);
    res.json({
        code: 200
    });
});
exports.deletePatch = deletePatch;
