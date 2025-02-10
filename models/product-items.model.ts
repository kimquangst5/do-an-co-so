import slug from "mongoose-slug-updater";
import mongoose from "mongoose";
import { STATUS } from "../constants/enum";

const productItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      // require: true
    },
    color: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    size: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    price: Number,
    discount: Number,
    quantity: Number,
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
    },
    position: {
      type: Number,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const ProductItem = mongoose.model("ProductItem", productItemSchema);

export default ProductItem;
