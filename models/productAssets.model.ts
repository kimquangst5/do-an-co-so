import slug from "mongoose-slug-updater";
import mongoose from "mongoose";
import { STATUS } from "../constants/enum";

const productAssetSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      trim: true,
    },
    assetsId: {
      type: mongoose.Types.ObjectId,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
      lowercase: true,
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
    position: Number
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

// mongoose.plugin(slug);

const ProductAssets = mongoose.model("ProductAssets", productAssetSchema);

export default ProductAssets;
