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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.index = void 0;
const index_service_1 = require("../../services/admin/index.service");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listColor = yield index_service_1.colorProductService.get(req.query);
    res.render("admin/pages/colorProduct/index.pug", {
        pageTitle: "Thêm màu sắc sản phẩm",
        pageDesc: "Thêm màu sắc sản phẩm",
        listColor: listColor,
    });
});
exports.index = index;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteManyColor = yield index_service_1.colorProductService.deleteMany(req.body);
    const findOneAndUpdateColor = yield index_service_1.colorProductService.findOneAndUpdate(req.body);
    res.json({
        code: 200,
    });
});
exports.update = update;
