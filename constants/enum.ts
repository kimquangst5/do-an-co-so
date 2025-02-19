const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

const TYPE_IMAGE = {
  MAIN: "main",
  SUB: "sub",
};
interface STATUS_ORDER {
  WAIT_CONFIRMATION: string;
  WAIT_PICK_UP_GOODS: string;
  IN_TRANSIT: string;
  DELIVERED: string;
  DELIVERY_FAILED: string;
  RETURNING: string;
  RETURNED: string;
  CANCELLED: string;
  PENDING_PAYMENT: string;
  COMPLETED: string;
}
const STATUS_ORDER: STATUS_ORDER = {
  WAIT_CONFIRMATION: "cho-xac-nhan",
  WAIT_PICK_UP_GOODS: "cho-lay-hang",
  IN_TRANSIT: "dang-giao-hang",
  DELIVERED: "da-giao-hang",
  DELIVERY_FAILED: "giao-hang-that-bai",
  RETURNING: "dang-hoan-tra",
  RETURNED: "da-hoan-tra",
  CANCELLED: "da-huy",
  PENDING_PAYMENT: "cho-thanh-toan",
  COMPLETED: "hoan-thanh",
};

export { STATUS, TYPE_IMAGE, STATUS_ORDER };
