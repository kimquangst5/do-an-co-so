import { model, Schema, Types } from "mongoose";
import { STATUS } from "../constants/enum";
import mongoose from "mongoose";
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
    createdBy: mongoose.SchemaTypes.ObjectId,
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Account = model("Account", accountsSchema);

export default Account;
