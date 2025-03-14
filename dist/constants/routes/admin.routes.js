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
    },
    ACCOUNT: {
        PATH: "/Tài_khoản",
        INDEX: "/Tổng_quan",
        CREATE: "/Tạo_tài_khoản",
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
    }
};
const ENCODED_ROUTER_ADMIN = (0, encodeRouterPaths_1.encodeRouterPathsSync)(ROUTER_ADMIN);
exports.default = ENCODED_ROUTER_ADMIN;
