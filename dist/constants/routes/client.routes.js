"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ROUTER_CLIENT = {
    PRODUCT: {
        PATH: "/san-pham",
        DETAIL: "/chi-tiet-san-pham",
    },
    CUSTOMER: {
        PATH: '/nguoi-dung',
        LOGIN: '/dang-nhap',
        REGISTER: '/dang-ky',
        LOGOUT: '/dang-xuat',
        REVIEW: '/danh-gia',
    },
    CART: {
        PATH: '/gio-hang',
        INDEX: '/tong-quan',
        ADD: '/them-san-pham-vao-gio',
        DELETE: '/xoa-san-pham-khoi-gio-hang',
        ADD_QUANTITY: '/them-so-luong',
        DECREASE: '/giam-so-luong',
    }
};
exports.default = ROUTER_CLIENT;
