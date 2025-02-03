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
exports.review = void 0;
require('dotenv').config();
const review = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!res.locals.INFOR_CUSTOMER) {
        res.status(400).json({
            message: 'Vui lòng đăng nhập để đánh giá!'
        });
        return;
    }
    if (!data.content) {
        res.status(400).json({
            message: 'Vui lòng viết nhận xét!'
        });
        return;
    }
    if (data.content.length < 20) {
        res.status(400).json({
            message: 'Nhận xét quá ngắn'
        });
        return;
    }
    next();
});
exports.review = review;
