import mongoose from "mongoose";
import { STATUS_ORDER } from "../constants/enum";

const orderSchema = new mongoose.Schema(
  {
    inforCustomer: {
      fullname: String,
      email: String,
      phone: String,
      address: String,
      city: Number,
      district: Number,
      ward: Number,
      note: String,
    },
    inforProductItem: [
      {
        productItemId: mongoose.SchemaTypes.ObjectId,
        price: Number,
        discount: Number,
        quantity: Number,
      },
    ],
    status: {
      type: String,
      // enum: Object.values(STATUS_ORDER.WAIT_CONFIRMATION),
      default: STATUS_ORDER.WAIT_CONFIRMATION,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
