"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encodeRouterPaths_1 = require("../../helpers/encodeRouterPaths");
const ROUTER_ADMIN = {
    AUTH: process.env.ADMIN,
    LOGIN: "/Đăng_nhập_quản_trị",
    PRODUCT: {
        PATH: "/Sản_phẩm",
        INDEX: "/Tổng_quan",
        CREATE: "/Tạo_sản_phẩm",
        READ: "/Chi_tiết_sản_phẩm",
        UPDATE: "/Cập_nhật_sản_phẩm",
        CHANGE_STATUS: "/Cập_nhật_trạng_thái_sản_phẩm",
        CHANGE_STATUS_MANY_PRODUCT: "/Cập_nhật_trạng_thái_nhiều_sản_phẩm",
        DELETE: "/Xóa_sản_phẩm",
        TRASH: "/Thùng_rác",
        DELETE_MANY: "/Xóa_nhiều_sản_phẩm",
    },
    PRODUCT_CATEGORY: {
        PATH: "/Danh_mục_sản_phẩm",
        INDEX: "/Tổng_quan",
        CREATE: "/Tạo_mới",
        UPDATE: "/Cập_nhật_danh_mục",
        TRASH: "/Thùng_rác",
    },
    ROLES: {
        PATH: "/Nhóm_quyền",
        INDEX: "/Tổng_quan",
        CREATE: "/Tạo_nhóm_quyền",
        UPDATE: "/Cập_nhật",
        PERMISSION: "/Phân_quyền",
        TRASH: "/Thùng_rác",
    },
    ACCOUNT: {
        PATH: "/Tài_khoản",
        INDEX: "/Tổng_quan",
        CREATE: "/Tạo_tài_khoản",
        UPDATE: "/Cập_nhật_tài_khoản",
        TRASH: "/Xóa_tài_khoản",
    },
    COLOR_PRODUCT: {
        PATH: "/Màu_sản_phẩm",
        INDEX: "/Tổng_quan",
        CREATE: "/Tạo_màu_sản_phẩm",
        READ: "/detail",
        UPDATE: "/update",
        DELETE: "/delete",
    },
    SIZE: {
        PATH: "/Kích_thước_sản_phẩm",
        INDEX: "/Tổng_quan",
        CREATE: "/Tạo_kích_thước_sản_phẩm",
        READ: "/detail",
        UPDATE: "/update",
        DELETE: "/delete",
    },
    CUSTOMERS: {
        PATH: "/Khách_hàng",
        INDEX: "/Tổng_quan",
        CREATE: "/Tạo_kích_thước_sản_phẩm",
        READ: "/detail",
        UPDATE: "/Cập_nhật_thông_tin_khách_hàng",
        DELETE: "/Xóa_khách_hàng",
        TRASH: "/Thùng_rác",
        CREATE_ADDRESS: "/Thêm_địa_chỉ",
        GET_ADDRESS: "/Lấy_địa_chỉ",
        UPDATE_ADDRESS_DEFAULT: "/Cập_nhật_địa_chỉ_mặc_định",
    },
    ORDERS: {
        PATH: "/Đơn_hàng",
        INDEX: "/Tổng_quan",
        CREATE: "/Tạo_đơn_hàng",
        READ: "/chi_tiết",
        UPDATE: "/cập_nhật",
        DELETE: "/xóa",
        TRASH: "/rác",
    },
    PATH: {
        PATH: "/Đường_dẫn",
        INDEX: "/Tổng_quan",
    },
};
const ENCODED_ROUTER_ADMIN = (0, encodeRouterPaths_1.encodeRouterPathsSync)(ROUTER_ADMIN);
exports.default = ENCODED_ROUTER_ADMIN;
