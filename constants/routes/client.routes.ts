interface ROUTER_CLIENT {
  PRODUCT: {
    PATH: string;
    DETAIL: string;
  };
  CUSTOMER: {
    PATH: string;
    LOGIN: string;
    REGISTER: string;
    LOGOUT: string;
    REVIEW: string;
    GOOGLE: string;
    GOOGLE_CALLBACK: string;
    FORGOT_PASSWORD: string;
    FORGOT_PASSWORD_OTP: string;
    FORGOT_PASSWORD_NEW_PASSWORD: string;
  };
  CART: {
    PATH: string;
    INDEX: string;
    ADD: string;
    DELETE?: string;
    ADD_QUANTITY: string;
    DECREASE: string;
  };
  CHECKOUT: {
    PATH: string;
    INDEX: string;
    SUCCESS: string;
  };
}

const ROUTER_CLIENT: ROUTER_CLIENT = {
  PRODUCT: {
    PATH: "/san-pham",
    DETAIL: "",
  },
  CUSTOMER: {
    PATH: "/nguoi-dung",
    LOGIN: "/dang-nhap",
    REGISTER: "/dang-ky",
    LOGOUT: "/dang-xuat",
    REVIEW: "/danh-gia",
    GOOGLE: "/dang-nhap-bang-google",
    GOOGLE_CALLBACK: "/dang-nhap-bang-google-tra-ve-ket-qua",
    FORGOT_PASSWORD: "/quen-mat-khau",
    FORGOT_PASSWORD_OTP: "/quen-mat-khau-nhap-ma-otp",
    FORGOT_PASSWORD_NEW_PASSWORD: "/quen-mat-khau-nhap-ma-mat-khau-moi",
  },
  CART: {
    PATH: "/gio-hang",
    INDEX: "/tong-quan",
    ADD: "/them-san-pham-vao-gio",
    DELETE: "/xoa-san-pham-khoi-gio-hang",
    ADD_QUANTITY: "/them-so-luong",
    DECREASE: "/giam-so-luong",
  },
  CHECKOUT: {
    PATH: "/thanh-toan",
    INDEX: "",
    SUCCESS: "/thanh-cong",
  },
};

export default ROUTER_CLIENT;
