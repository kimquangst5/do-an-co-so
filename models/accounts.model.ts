import { model, Schema, Types } from "mongoose";
import { STATUS } from "../constants/enum";

const accountsSchema = new Schema(
  {
    fullname: String,
    roles: Types.ObjectId,
    usename: String,
    email: String,
    password: String,
    token: String,
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

const Account = model("Account", accountsSchema);

export default Account;
