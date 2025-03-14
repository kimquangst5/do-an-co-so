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
exports.deletePatch = exports.updatePatch = exports.update = exports.index = void 0;
const customers_model_1 = __importDefault(require("../../models/customers.model"));
const mongodb_1 = require("mongodb");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customers_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/customers/index.pug", {
        pageTitle: "Danh sách khách hàng",
        pageDesc: "Danh sách khách hàng",
        customers: customers
    });
});
exports.index = index;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const customer = yield customers_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.render("admin/pages/customers/update.pug", {
        pageTitle: "Danh sách khách hàng",
        pageDesc: "Danh sách khách hàng",
        customer
    });
});
exports.update = update;
function capitalizeWords(str) {
    str = str.toLowerCase();
    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        const firstChar = words[i].charAt(0).toUpperCase();
        const restOfWord = words[i].slice(1);
        words[i] = firstChar + restOfWord;
    }
    return words.join(" ");
}
const updatePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.birthday = req.body.birthday.split('-').reverse().join('/');
    req.body.fullname = capitalizeWords(req.body.fullname.trim().replace(/\s+/g, " "));
    req.body.username = req.body.username.trim().toLowerCase();
    yield customers_model_1.default.updateOne({
        _id: new mongodb_1.ObjectId(req.params.id),
        deleted: false
    }, req.body);
    res.json({
        code: 200
    });
});
exports.updatePatch = updatePatch;
const deletePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield customers_model_1.default.updateOne({
        _id: new mongodb_1.ObjectId(id)
    }, {
        deleted: true
    });
    res.status(200).json({
        code: 200
    });
});
exports.deletePatch = deletePatch;
