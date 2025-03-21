import { encodeRouterPathsSync } from "../../helpers/encodeRouterPaths";

export interface GeneralRoutes {
  PATH: string;
  INDEX: string;
  CREATE?: string;
  READ?: string;
  UPDATE?: string;
  TRASH?: string;
  DELETE?: string;
}

interface Roles extends GeneralRoutes {
  PERMISSION?: string;
}

interface Customer extends GeneralRoutes {
  CREATE_ADDRESS?: string;
  GET_ADDRESS?: string;
  UPDATE_ADDRESS_DEFAULT?: string;
}

interface Product extends GeneralRoutes {
  CHANGE_STATUS?: string;
  CHANGE_STATUS_MANY_PRODUCT?: string;
  DELETE_MANY?: string;
}

export interface RouterAdmin {
  AUTH: string;
  LOGIN: string;
  PRODUCT?: Product;
  ROLES?: Roles;
  ACCOUNT?: GeneralRoutes;
  COLOR_PRODUCT?: GeneralRoutes;
  SIZE?: GeneralRoutes;
  PRODUCT_CATEGORY?: GeneralRoutes;
  CUSTOMERS?: Customer;
  ORDERS?: GeneralRoutes;
  PATH?: GeneralRoutes;
}

const ROUTER_ADMIN: RouterAdmin = {
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

const ENCODED_ROUTER_ADMIN = encodeRouterPathsSync(ROUTER_ADMIN);

export default ENCODED_ROUTER_ADMIN;
