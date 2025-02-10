import mongoose from "mongoose";
import { STATUS } from "../constants/enum";

const assetSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      trim: true,
    },
    path: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
      lowercase: true,
    },
    format: {
      type: String,
      trim: true,
      lowercase: true,
    },
    size: {
      type: Number,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      trim: true,
      default: STATUS.ACTIVE,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true
    },
    deletedBy: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Assets = mongoose.model("Assets", assetSchema);

export default Assets;
