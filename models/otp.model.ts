import mongoose from "mongoose";
import { STATUS } from "../constants/enum";

const otpSchema = new mongoose.Schema(
  {
    email: String,
    code: {
      type: Number,
      trim: true,
    },
    expireAt: {
      type: Date,
      expires: 0,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
