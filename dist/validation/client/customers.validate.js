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
exports.infoCustomerUpdateInfor = exports.infoCustomerUpdatePassword = exports.infoCustomerUpdatePhonePatch = exports.infoCustomerUpdateEmailPatch = exports.forgotPasswordNewPassword = exports.forgotPasswordCheckOtp = exports.forgotPassword = exports.login = exports.register = void 0;
const argon2_1 = __importDefault(require("argon2"));
const customers_model_1 = __importDefault(require("../../models/customers.model"));
const otp_model_1 = __importDefault(require("../../models/otp.model"));
require("dotenv").config();
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, email, password, confirmPassword } = req.body;
    let errorArray = [];
    if (!fullname)
        errorArray.push("Chưa nhập họ tên!");
    if (fullname.length < 6)
        errorArray.push("Họ và tên quá ngắn");
    if (!username)
        errorArray.push("Chưa nhập tên đăng nhập!");
    if (username.length <= 8)
        errorArray.push("Tên đăng nhập quá ngắn");
    if (!email)
        errorArray.push("Chưa nhập email!");
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (emailRegex.test(email) == false)
        errorArray.push("Email không hợp lệ!");
    if (!password)
        errorArray.push("Chưa nhập mật khẩu!");
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (passwordRegex.test(password) == false)
        errorArray.push("Mật khẩu không hợp lệ!\nTối thiểu là 8 ký tự.\nÍt nhất một chữ hoa.\nÍt nhất một chữ thường\nÍt nhất một số.\n Ít nhất một ký tự đặc biệt");
    if (!confirmPassword)
        errorArray.push("Chưa nhập xác nhận mật khẩu!");
    if (password != confirmPassword)
        errorArray.push("MK và xác nhận MK không giống!");
    const checkUsername = yield customers_model_1.default.findOne({
        username: username,
    });
    if (checkUsername)
        errorArray.push("Tên đăng nhập đã tồn tại!");
    const checkEmail = yield customers_model_1.default.findOne({
        email: email,
    });
    if (checkEmail)
        errorArray.push("Email đã tồn tại!");
    if (/\s/.test(username))
        errorArray.push("Tên đăng nhập không được có khoảng trắng!");
    if (errorArray.length > 0) {
        res.status(400).json({
            message: errorArray.join("\n"),
        });
        return;
    }
    else
        next();
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let errorArray = [];
    if (!data.username)
        errorArray.push("Chưa nhập tên đăng nhập hoặc email!");
    if (data.username.length <= 8)
        errorArray.push("Tên đăng nhập quá ngắn");
    if (!data.password)
        errorArray.push("Chưa nhập mật khẩu!");
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (passwordRegex.test(data.password) == false)
        errorArray.push("Mật khẩu không hợp lệ!\nTối thiểu là 8 ký tự.\nÍt nhất một chữ hoa.\nÍt nhất một chữ thường\nÍt nhất một số.\n Ít nhất một ký tự đặc biệt");
    const customer = yield customers_model_1.default.findOne({
        $or: [
            {
                email: req.body.username,
            },
            {
                username: req.body.username,
            },
        ],
    });
    if (!customer)
        errorArray.push("Tên đăng nhập chưa đúng!");
    else {
        if (!customer.password)
            errorArray.push("Vui lòng đăng nhập bằng Google!");
        else {
            const checkPass = yield argon2_1.default.verify(customer.password, req.body.password);
            if (checkPass == false)
                errorArray.push("Mật khẩu chưa đúng!");
        }
    }
    if (errorArray.length > 0) {
        res.status(400).json({
            message: errorArray.join("\n"),
        });
        return;
    }
    else
        next();
});
exports.login = login;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.email) {
        res.status(400).json({
            message: "Chưa điền email!",
        });
        return;
    }
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (emailRegex.test(data.email) == false) {
        res.status(400).json({
            message: "Email không hợp lệ!",
        });
        return;
    }
    const check = yield customers_model_1.default.findOne({
        email: data.email,
    });
    if (!check) {
        res.status(400).json({
            message: "Email chưa được đăng ký!",
        });
        return;
    }
    next();
});
exports.forgotPassword = forgotPassword;
const forgotPasswordCheckOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    if (!email) {
        res.status(400).json({
            message: "Chưa điền email!",
        });
        return;
    }
    if (!code) {
        res.status(400).json({
            message: "Chưa điền mã OTP!",
        });
        return;
    }
    if (code.length != 6) {
        res.status(400).json({
            message: `Mã OTP thiếu ${6 - code.length} ký tự`,
        });
        return;
    }
    const customer = yield customers_model_1.default.findOne({
        email: email,
    });
    if (!customer) {
        res.status(400).json({
            message: `Email chưa được đăng ký!`,
        });
        return;
    }
    const otp = yield otp_model_1.default.findOne({
        email: email,
    });
    if (!otp) {
        res.status(400).json({
            message: `Mã OTP đã hết hiệu lực!`,
        });
        return;
    }
    else {
        if (otp.code != parseInt(code)) {
            res.status(400).json({
                message: `Mã OTP không đúng!`,
            });
            return;
        }
        else
            next();
    }
});
exports.forgotPasswordCheckOtp = forgotPasswordCheckOtp;
const forgotPasswordNewPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword } = req.body;
    if (!email) {
        res.status(400).json({
            message: `Chưa nhập email!`,
        });
        return;
    }
    if (!password) {
        res.status(400).json({
            message: `Chưa nhập mật khẩu!`,
        });
        return;
    }
    if (!confirmPassword) {
        res.status(400).json({
            message: `Chưa nhập xác nhận mật khẩu!`,
        });
        return;
    }
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (passwordRegex.test(password) == false) {
        res.status(400).json({
            message: "Mật khẩu không hợp lệ!\nTối thiểu là 8 ký tự.\nÍt nhất một chữ hoa.\nÍt nhất một chữ thường\nÍt nhất một số.\n Ít nhất một ký tự đặc biệt",
        });
        return;
    }
    if (password != confirmPassword) {
        res.status(400).json({
            message: `MK và xác nhận MK không giống!`,
        });
        return;
    }
    const customer = yield customers_model_1.default.findOne({
        email: email,
    });
    if (!customer) {
        res.status(400).json({
            message: `Tài khoản chưa được đăng ký!`,
        });
        return;
    }
    next();
});
exports.forgotPasswordNewPassword = forgotPasswordNewPassword;
const infoCustomerUpdateEmailPatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errorArray = [];
    const { email, otp } = req.body;
    if (!otp)
        errorArray.push("Chưa nhập mã OTP");
    if (!email)
        errorArray.push("Chưa nhập Email");
    if (otp && email) {
        const otpDatabase = yield otp_model_1.default.findOne({
            email: res.locals.INFOR_CUSTOMER.email,
        });
        if (!otpDatabase)
            errorArray.push("Vui lòng gửi lại mã OTP");
        else {
            if (otpDatabase.code !== parseInt(otp))
                errorArray.push("Mã OTP không hợp lệ!");
            const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            if (emailRegex.test(email) == false) {
                errorArray.push("Email không hợp lệ!");
            }
            if (otpDatabase.email === email)
                errorArray.push("Email mới không được giống với Email cũ!");
            const customer = yield customers_model_1.default.findOne({
                email: email,
            });
            if (otpDatabase.email !== email && customer)
                errorArray.push("Email mới này đã có người sử dụng!");
        }
    }
    if (errorArray.length > 0) {
        res.status(400).json({
            message: errorArray.join("\n"),
        });
        return;
    }
    else
        next();
});
exports.infoCustomerUpdateEmailPatch = infoCustomerUpdateEmailPatch;
const infoCustomerUpdatePhonePatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errorArray = [];
    const { phone, otp } = req.body;
    if (!otp)
        errorArray.push("Chưa nhập mã OTP");
    if (!phone)
        errorArray.push("Chưa nhập Số điện thoại");
    if (otp && phone) {
        const otpDatabase = yield otp_model_1.default.findOne({
            email: res.locals.INFOR_CUSTOMER.email,
        });
        if (!otpDatabase)
            errorArray.push("Vui lòng gửi lại mã OTP");
        else {
            if (otpDatabase.code !== parseInt(otp))
                errorArray.push("Mã OTP không hợp lệ!");
            const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
            if (phoneRegex.test(phone) == false) {
                errorArray.push("Số điện thoại không hợp lệ!");
            }
            if (res.locals.INFOR_CUSTOMER.phone === phone)
                errorArray.push("Số điện thoại mới không được giống với số điện thoại cũ!");
            const customer = yield customers_model_1.default.findOne({
                phone: phone,
            });
            if (res.locals.INFOR_CUSTOMER.phone !== phone && customer)
                errorArray.push("Số điện thoại mới này đã có người sử dụng!");
        }
    }
    if (errorArray.length > 0) {
        res.status(400).json({
            message: errorArray.join("\n"),
        });
        return;
    }
    else
        next();
});
exports.infoCustomerUpdatePhonePatch = infoCustomerUpdatePhonePatch;
const infoCustomerUpdatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    let errorArray = [];
    if (res.locals.INFOR_CUSTOMER.password && !oldPassword)
        errorArray.push("Chưa nhập mật khẩu cũ");
    if (!newPassword)
        errorArray.push("Chưa nhập mật khẩu mới");
    if (!confirmPassword)
        errorArray.push("Chưa nhập xác nhận mật khẩu");
    if (newPassword && confirmPassword) {
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (passwordRegex.test(newPassword) == false) {
            errorArray.push("Mật khẩu không hợp lệ!\nTối thiểu là 8 ký tự.\nÍt nhất một chữ hoa.\nÍt nhất một chữ thường\nÍt nhất một số.\n Ít nhất một ký tự đặc biệt");
        }
        if (newPassword !== confirmPassword) {
            errorArray.push("MK mới và xác nhận MK không giống nhau");
        }
        if (res.locals.INFOR_CUSTOMER.password) {
            if (newPassword === oldPassword)
                errorArray.push("MK mới và mật khẩu cũ không được giống!");
            if ((yield argon2_1.default.verify(res.locals.INFOR_CUSTOMER.password, oldPassword)) == false)
                errorArray.push("MK cũ không đúng!");
        }
    }
    if (errorArray.length > 0) {
        res.status(400).json({
            message: errorArray.join("\n"),
        });
        return;
    }
    else
        next();
});
exports.infoCustomerUpdatePassword = infoCustomerUpdatePassword;
const infoCustomerUpdateInfor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, genders, birthday } = req.body;
    let errorArray = [];
    if (!fullname)
        errorArray.push("Chưa nhập họ tên!");
    if (!username)
        errorArray.push("Chưa nhập tên đăng nhập!");
    if (!genders)
        errorArray.push("Chưa nhập giới tính");
    if (!birthday)
        errorArray.push("Chưa nhập ngày sinh");
    if (fullname && username && genders && birthday) {
        if (fullname.length < 6)
            errorArray.push("Họ và tên quá ngắn");
        if (username.length <= 8)
            errorArray.push("Tên đăng nhập quá ngắn");
        function calculateAge(birthDateString) {
            let today = new Date();
            let birthDate = new Date(birthDateString);
            let age = today.getFullYear() - birthDate.getFullYear();
            let monthDiff = today.getMonth() - birthDate.getMonth();
            let dayDiff = today.getDate() - birthDate.getDate();
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }
            return age;
        }
        if (calculateAge(birthday) < 0)
            errorArray.push(`Bạn là người tương lai :)`);
        else if (calculateAge(birthday) < 18)
            errorArray.push(`Bạn ${calculateAge(birthday)} tuổi hả`);
        const customer = yield customers_model_1.default.countDocuments({
            _id: {
                $ne: res.locals.INFOR_CUSTOMER.id,
            },
            username: username,
        });
        if (customer > 0)
            errorArray.push(`Tên đăng nhập đã được người khác sử dụng!`);
    }
    if (errorArray.length > 0) {
        res.status(400).json({
            message: errorArray.join("\n"),
        });
        return;
    }
    else
        next();
});
exports.infoCustomerUpdateInfor = infoCustomerUpdateInfor;
