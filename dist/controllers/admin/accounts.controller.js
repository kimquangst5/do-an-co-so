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
exports.deletePatch = exports.updatePatch = exports.update = exports.createPost = exports.create = exports.index = void 0;
const mongodb_1 = require("mongodb");
const index_service_1 = require("../../services/admin/index.service");
const roles_models_1 = __importDefault(require("../../models/roles.models"));
const accounts_model_1 = __importDefault(require("../../models/accounts.model"));
const capitalizeWords_helper_1 = require("../../helpers/capitalizeWords.helper");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const accounts = yield accounts_model_1.default.find({
        deleted: false,
    });
    try {
        for (var _d = true, accounts_1 = __asyncValues(accounts), accounts_1_1; accounts_1_1 = yield accounts_1.next(), _a = accounts_1_1.done, !_a; _d = true) {
            _c = accounts_1_1.value;
            _d = false;
            const acc = _c;
            const role = yield roles_models_1.default.findOne({
                _id: acc.roles,
            });
            acc["role_name"] = role.name;
            if (acc.createdBy) {
                const author = yield accounts_model_1.default.findOne({
                    _id: acc.createdBy,
                });
                acc["author"] = author.fullname;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = accounts_1.return)) yield _b.call(accounts_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Danh sách tài khoản quản trị",
        pageDesc: "Danh sách tài khoản quản trị",
        accounts: accounts,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.query.deleted = "false";
    req.query.status = "active";
    const listRole = yield index_service_1.rolesService.get(req.query);
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Thêm tài khoản quản trị",
        pageDesc: "Thêm tài khoản quản trị",
        listRole: listRole,
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccount = yield index_service_1.accountsService.create(req.body, res.locals.INFOR_USER.id);
    res.json({
        code: 200,
    });
});
exports.createPost = createPost;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const account = yield accounts_model_1.default.findOne({
        deleted: false,
        _id: new mongodb_1.ObjectId(id),
    }).select("-token -password");
    const listRole = yield roles_models_1.default.find({
        deleted: false,
        status: "active",
    });
    res.render("admin/pages/accounts/update.pug", {
        pageTitle: "Cập nhật tài khoản",
        account: account,
        listRole: listRole,
    });
});
exports.update = update;
const updatePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    req.body.fullname = (0, capitalizeWords_helper_1.capitalizeWords)(req.body.fullname.trim().replace(/\s+/g, " "));
    yield accounts_model_1.default.updateOne({
        deleted: false,
        _id: new mongodb_1.ObjectId(id),
    }, req.body);
    res.json({
        code: 200,
    });
});
exports.updatePatch = updatePatch;
const deletePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    yield accounts_model_1.default.updateOne({
        _id: new mongodb_1.ObjectId(req.params.id),
    }, {
        deleted: true,
    });
    res.json({
        code: 200,
    });
});
exports.deletePatch = deletePatch;
