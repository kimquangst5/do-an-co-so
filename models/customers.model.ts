import { model, Schema, Types } from "mongoose";
import { STATUS } from "../constants/enum";

const customersSchema = new Schema(
  {
    fullname: String,
    username: String,
    email: String,
    password: String,
    token: String,
    avatar: String,
    birthday: String,
    phone: String,
    genders: String,
    address: [
      {
        city: Number,
        district: Number,
        ward: Number,
        address: String,
        fullname: String,
        phone: String,
        default: {
          type: Boolean,
          default: true
        }
      }
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Customer = model("Customer", customersSchema);

export default Customer;
