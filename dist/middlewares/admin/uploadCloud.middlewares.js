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
exports.single = exports.multi = void 0;
const streamUpload_helper_1 = __importDefault(require("../../helpers/streamUpload.helper"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const multi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    if (req["files"].images_main && req["files"].images_main.length > 0) {
        let dataPushAssetsMain = [];
        try {
            for (var _g = true, _h = __asyncValues(req["files"].images_main), _j; _j = yield _h.next(), _a = _j.done, !_a; _g = true) {
                _c = _j.value;
                _g = false;
                const it = _c;
                const fileName = it.originalname.slice(0, it.originalname.lastIndexOf("."));
                const filename = iconv_lite_1.default
                    .decode(Buffer.from(fileName, "latin1"), "utf8")
                    .replace(/\s+/g, "_");
                let upload = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
                    let result = yield (0, streamUpload_helper_1.default)(buffer, filename);
                    const newAssets = {
                        filename: result["display_name"].replace(/_/g, " "),
                        path: result["secure_url"],
                        size: parseInt(result["bytes"]),
                        type: result["resource_type"],
                        format: result["format"],
                    };
                    dataPushAssetsMain.push(newAssets);
                });
                yield upload(it.buffer);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = _h.return)) yield _b.call(_h);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const listAssets = yield assets_model_1.default.insertMany(dataPushAssetsMain);
        req.body[req["files"].images_main[0].fieldname] = listAssets;
    }
    if (req["files"].images_sub && req["files"].images_sub.length > 0) {
        let dataPushAssetsSub = [];
        try {
            for (var _k = true, _l = __asyncValues(req["files"].images_sub), _m; _m = yield _l.next(), _d = _m.done, !_d; _k = true) {
                _f = _m.value;
                _k = false;
                const it = _f;
                const fileName = it.originalname.slice(0, it.originalname.lastIndexOf("."));
                const filename = iconv_lite_1.default
                    .decode(Buffer.from(fileName, "latin1"), "utf8")
                    .replace(/\s+/g, "_");
                let upload = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
                    let result = yield (0, streamUpload_helper_1.default)(buffer, filename);
                    const newAssets = {
                        filename: result["display_name"].replace(/_/g, " "),
                        path: result["secure_url"],
                        size: parseInt(result["bytes"]),
                        type: result["resource_type"],
                        format: result["format"],
                    };
                    dataPushAssetsSub.push(newAssets);
                });
                yield upload(it.buffer);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_k && !_d && (_e = _l.return)) yield _e.call(_l);
            }
            finally { if (e_2) throw e_2.error; }
        }
        const listAssets = yield assets_model_1.default.insertMany(dataPushAssetsSub);
        req.body[req["files"].images_sub[0].fieldname] = listAssets;
    }
    next();
});
exports.multi = multi;
const single = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
});
exports.single = single;
