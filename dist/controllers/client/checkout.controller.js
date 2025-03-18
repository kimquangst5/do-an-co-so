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
exports.success = exports.create = exports.index = void 0;
const products_model_1 = __importDefault(require("../../models/products.model"));
const productAssets_model_1 = __importDefault(require("../../models/productAssets.model"));
const assets_model_1 = __importDefault(require("../../models/assets.model"));
const product_items_model_1 = __importDefault(require("../../models/product-items.model"));
const mongodb_1 = require("mongodb");
const carts_model_1 = __importDefault(require("../../models/carts.model"));
const colorProduct_model_1 = __importDefault(require("../../models/colorProduct.model"));
const sizeProduct_model_1 = __importDefault(require("../../models/sizeProduct.model"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const index_routes_1 = __importDefault(require("../../constants/routes/index.routes"));
const axios_1 = __importDefault(require("axios"));
const console_1 = __importDefault(require("console"));
const capitalizeWords_helper_1 = require("../../helpers/capitalizeWords.helper");
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
    res.render("client/pages/checkouts/index.pug", {
        pageTitle: "Thanh toán đơn hàng",
        pageDesc: "Thanh toán đơn hàng",
        carts: carts,
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_2, _b, _c;
    let { fullname, email, phone, address, city, district, ward, note, cart } = req.body;
    const data = {
        inforCustomer: {
            customerId: new mongodb_1.ObjectId(res.locals.INFOR_CUSTOMER.id),
            fullname: (0, capitalizeWords_helper_1.capitalizeWords)(fullname.trim().replace(/\s+/g, " ")),
            email: email,
            phone: phone,
            address: (0, capitalizeWords_helper_1.capitalizeWords)(address.trim().replace(/\s+/g, " ")),
            city: parseInt(city),
            district: parseInt(district),
            ward: parseInt(ward),
            note: note.trim().replace(/\s+/g, " "),
        },
        inforProductItem: [],
    };
    let listCartId = [];
    let totalPrice = 0;
    try {
        for (var _d = true, cart_1 = __asyncValues(cart), cart_1_1; cart_1_1 = yield cart_1.next(), _a = cart_1_1.done, !_a; _d = true) {
            _c = cart_1_1.value;
            _d = false;
            const cartId = _c;
            listCartId.push(new mongodb_1.ObjectId(cartId));
            const cartItem = yield carts_model_1.default.findOne({
                _id: cartId,
            });
            const items = yield product_items_model_1.default.findOne({
                _id: cartItem.productItemId,
            });
            totalPrice +=
                (items["price"] - items["price"] * (items["discount"] / 100)) *
                    cartItem["quantity"];
            const dataItem = {
                productItemId: new mongodb_1.ObjectId(items.id),
                price: items.price,
                discount: items.discount,
                quantity: cartItem.quantity,
            };
            data.inforProductItem.push(dataItem);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = cart_1.return)) yield _b.call(cart_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (totalPrice >= 500000)
        data["shipping_fee"] = 0;
    else
        data["shipping_fee"] = 20000;
    const order = new order_model_1.default(data);
    yield order.save();
    order.inforProductItem["totalPrice"] = totalPrice;
    yield carts_model_1.default.deleteMany({
        _id: listCartId,
    });
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "kimquangst5@gmail.com",
            pass: process.env.PASSWORD_APPLICATION,
        },
    });
    function getLocationNames(cityId, districtId, wardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const Parameter = {
                url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
                method: "GET",
            };
            try {
                const response = yield (0, axios_1.default)(Parameter);
                const data = response.data;
                const city = data.find((c) => c.Id == cityId);
                const cityName = city ? city.Name : "Không tìm thấy";
                const district = city
                    ? city.Districts.find((d) => d.Id == districtId)
                    : null;
                const districtName = district ? district.Name : "Không tìm thấy";
                const ward = district ? district.Wards.find((w) => w.Id == wardId) : null;
                const wardName = ward ? ward.Name : "Không tìm thấy";
                return { cityName, districtName, wardName };
            }
            catch (error) {
                console_1.default.error("Lỗi khi lấy dữ liệu địa lý:", error);
                return { cityName: "", districtName: "", wardName: "" };
            }
        });
    }
    const newAddress = yield getLocationNames(order.inforCustomer["city"], order.inforCustomer["district"], order.inforCustomer["ward"]);
    order.inforCustomer.address = `${order.inforCustomer.address}, ${newAddress.wardName}, ${newAddress.districtName}, ${newAddress.cityName}`;
    const protocol = req.headers["x-forwarded-proto"] ||
        (req.socket["encrypted"] ? "https" : "http");
    const domain = protocol + "://" + req.headers.host;
    const mailOptions = {
        from: "kimquangst5@gmail.com",
        to: res.locals.INFOR_CUSTOMER.email,
        subject: "Đặt đơn hàng thành công!",
        html: `<h1><code><span style="font-family: verdana, geneva, sans-serif; color: #e03e2d;">Đặt hàng th&agrave;nh c&ocirc;ng</span></code></h1>
<p>&nbsp;</p>
<h2><code><span style="font-family: verdana, geneva, sans-serif;">I. Th&ocirc;ng tin kh&aacute;ch h&agrave;ng</span></code></h2>
<div>
<div>
<div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Họ v&agrave; t&ecirc;n kh&aacute;ch h&agrave;ng:&nbsp;<strong>${order.inforCustomer.fullname}</strong></span></code></div>
<div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Email kh&aacute;ch h&agrave;ng: <strong><a href="mailto:kimquangst5@gmail.com">${order.inforCustomer.email}</a></strong></span></code></div>
<div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Số điện thoại kh&aacute;ch h&agrave;ng&nbsp;<strong>${order.inforCustomer.phone}</strong></span></code></div>
<div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Địa chỉ giao h&agrave;ng: <strong>${order.inforCustomer.address}</strong></span></code></div>
<div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Ghi ch&uacute;: <strong>${order.inforCustomer.note ? order.inforCustomer.note : "Không có"}</strong></span></code></div>
<div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Id đơn h&agrave;ng: <strong>${order.id}</strong></span></code></div>
<div style="padding-left: 40px;"><code><span style="font-size: 14pt; font-family: verdana, geneva, sans-serif;">Đường link đơn h&agrave;ng:&nbsp;<strong>${domain}${index_routes_1.default.CLIENT.CHECKOUT.PATH}${index_routes_1.default.CLIENT.CHECKOUT.SUCCESS}/${res.locals.INFOR_CUSTOMER.username}?id-don-hang=${order.id}</strong></span></code></div>
</div>
</div>
<h2><code><span style="font-family: verdana, geneva, sans-serif;">II. Th&ocirc;ng tin đơn h&agrave;ng (${order.inforProductItem.length} sản phẩm)</span></code></h2>
<p style="padding-left: 40px;"><code><span style="font-family: verdana, geneva, sans-serif; font-size: 14pt;">Th&agrave;nh tiền: <strong>${order.inforProductItem["totalPrice"] + order.shipping_fee} đồng</strong></span></code></p>
<p>&nbsp;</p>
<p style="text-align: right;"><code><em><span style="font-family: verdana, geneva, sans-serif; font-size: 14pt;">Xin cảm ơn qu&iacute; kh&aacute;ch đ&atilde; đặt h&agrave;ng của ch&uacute;ng t&ocirc;i, ch&uacute;ng t&ocirc;i sẽ sớm xử l&iacute; đơn h&agrave;ng của qu&iacute; kh&aacute;ch trong khoảng thời gian sớm nhất!</span></em></code></p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            res.status(400).json({
                message: "Gửi email không thành công!",
            });
            return;
        }
        else {
            console_1.default.log("Gửi thành công!");
        }
    }));
    res.json({
        code: 200,
        newOrder: order.id,
    });
});
exports.create = create;
const success = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_3, _b, _c;
    const id = req.query["id-don-hang"];
    const order = yield order_model_1.default.findOne({
        _id: id,
    });
    order.inforProductItem["totalPrice"] = 0;
    try {
        for (var _d = true, _e = __asyncValues(order.inforProductItem), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
            _c = _f.value;
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
            order.inforProductItem["totalPrice"] += it["priceNew"];
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
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
        }
        finally { if (e_3) throw e_3.error; }
    }
    res.render("client/pages/checkouts/success.pug", {
        pageTitle: "Đặt đơn thành công",
        pageDesc: "Đặt đơn thành công",
        order: order,
    });
});
exports.success = success;
