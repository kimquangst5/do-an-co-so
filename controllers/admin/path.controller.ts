import { Request, Response } from "express";
import Role from "../../models/roles.models";
import { rolesService } from "../../services/admin/index.service";
import { ObjectId } from "mongodb";
import Account from "../../models/accounts.model";
import Path from "../../models/paths.model";

const index = async (req: Request, res: Response) => {
  //   const newPatch = new Path({
  //     ADMIN: {
  //       AUTH: "/quản_trị",
  //       LOGIN: "/Đăng_nhập_quản_trị",
  //       PRODUCT: {
  //         PATH: "/Sản_phẩm",
  //         INDEX: "/Tổng_quan",
  //         CREATE: "/Tạo_sản_phẩm",
  //         READ: "/Chi_tiết_sản_phẩm",
  //         UPDATE: "/Cập_nhật_sản_phẩm",
  //         CHANGE_STATUS: "/Cập_nhật_trạng_thái_sản_phẩm",
  //         CHANGE_STATUS_MANY_PRODUCT: "/Cập_nhật_trạng_thái_nhiều_sản_phẩm",
  //         DELETE: "/Xóa_sản_phẩm",
  //         TRASH: "/Thùng_rác",
  //         DELETE_MANY: "/Xóa_nhiều_sản_phẩm",
  //       },
  //       PRODUCT_CATEGORY: {
  //         PATH: "/Danh_mục_sản_phẩm",
  //         INDEX: "/Tổng_quan",
  //         CREATE: "/Tạo_mới",
  //         UPDATE: "/Cập_nhật_danh_mục",
  //         TRASH: "/Thùng_rác",
  //       },
  //       ROLES: {
  //         PATH: "/Nhóm_quyền",
  //         INDEX: "/Tổng_quan",
  //         CREATE: "/Tạo_nhóm_quyền",
  //         UPDATE: "/Cập_nhật",
  //         PERMISSION: "/Phân_quyền",
  //         TRASH: "/Thùng_rác",
  //       },
  //       ACCOUNT: {
  //         PATH: "/Tài_khoản",
  //         INDEX: "/Tổng_quan",
  //         CREATE: "/Tạo_tài_khoản",
  //         UPDATE: "/Cập_nhật_tài_khoản",
  //         TRASH: "/Xóa_tài_khoản",
  //       },
  //       COLOR_PRODUCT: {
  //         PATH: "/Màu_sản_phẩm",
  //         INDEX: "/Tổng_quan",
  //         CREATE: "/Tạo_màu_sản_phẩm",
  //         READ: "/detail",
  //         UPDATE: "/update",
  //         DELETE: "/delete",
  //       },
  //       SIZE: {
  //         PATH: "/Kích_thước_sản_phẩm",
  //         INDEX: "/Tổng_quan",
  //         CREATE: "/Tạo_kích_thước_sản_phẩm",
  //         READ: "/detail",
  //         UPDATE: "/update",
  //         DELETE: "/delete",
  //       },
  //       CUSTOMERS: {
  //         PATH: "/Khách_hàng",
  //         INDEX: "/Tổng_quan",
  //         CREATE: "/Tạo_kích_thước_sản_phẩm",
  //         READ: "/detail",
  //         UPDATE: "/Cập_nhật_thông_tin_khách_hàng",
  //         DELETE: "/Xóa_khách_hàng",
  //         TRASH: "/Thùng_rác",
  //         CREATE_ADDRESS: "/Thêm_địa_chỉ",
  //         GET_ADDRESS: "/Lấy_địa_chỉ",
  //         UPDATE_ADDRESS_DEFAULT: "/Cập_nhật_địa_chỉ_mặc_định",
  //       },
  //       ORDERS: {
  //         PATH: "/Đơn_hàng",
  //         INDEX: "/Tổng_quan",
  //         CREATE: "/Tạo_đơn_hàng",
  //         READ: "/chi_tiết",
  //         UPDATE: "/cập_nhật",
  //         DELETE: "/xóa",
  //         TRASH: "/rác",
  //       },
  //       PATH: {
  //         PATH: "/Đường_dẫn",
  //         INDEX: "/Tổng_quan",
  //       },
  //     },
  //     CLIENT: {
  //       PRODUCT: {
  //         PATH: "/san-pham",
  //         DETAIL: "/chi-tiet",
  //         SEARCH: "/ket-qua-tim-kiem",
  //         INDEX: "/danh-sach",
  //       },
  //       CUSTOMER: {
  //         PATH: "/khach-hang",
  //         LOGIN: "/dang-nhap",
  //         REGISTER: "/dang-ky",
  //         LOGOUT: "/dang-xuat",
  //         REVIEW: "/danh-gia",
  //         GOOGLE: "/dang-nhap-bang-google",
  //         GOOGLE_CALLBACK: "/dang-nhap-bang-google-tra-ve-ket-qua",
  //         FORGOT_PASSWORD: "/quen-mat-khau",
  //         FORGOT_PASSWORD_OTP: "/quen-mat-khau-nhap-ma-otp",
  //         FORGOT_PASSWORD_NEW_PASSWORD: "/quen-mat-khau-nhap-ma-mat-khau-moi",
  //         INFOR_CUSTOMER: "/thong-tin-khach-hang",
  //         INFOR_CUSTOMER_UPDATE_INFOR: "/sua-thong-tin",
  //         INFOR_CUSTOMER_UPDATE_EMAIL: "/sua-email",
  //         INFOR_CUSTOMER_UPDATE_PHONE: "/sua-so-dien-thoai",
  //         INFOR_CUSTOMER_UPDATE_PASSWORD: "/doi-mat-khau",
  //         INFOR_CUSTOMER_CREATE_OTP: "/tao-otp",
  //       },
  //       CART: {
  //         PATH: "/gio-hang",
  //         INDEX: "/tong-quan",
  //         ADD: "/them-san-pham-vao-gio",
  //         DELETE: "/xoa-san-pham-khoi-gio-hang",
  //         ADD_QUANTITY: "/them-so-luong",
  //         DECREASE: "/giam-so-luong",
  //       },
  //       CHECKOUT: {
  //         PATH: "/thanh-toan",
  //         INDEX: "",
  //         SUCCESS: "/thanh-cong",
  //       },
  //       PRODUCT_CATEGORY: {
  //         PATH: "/danh-muc",
  //       },
  //     },
  //   });
  //   await newPatch.save();
  const protocol =
    req.headers["x-forwarded-proto"] ||
    (req.socket["encrypted"] ? "https" : "http");
  const domain = protocol + "://" + req.headers.host;
  res.render("admin/pages/path/index.pug", {
    pageTitle: "Quản lí đường dẫn",
    pageDesc: "Danh sách nhóm quyền",
    domain,
  });
};

export { index };
