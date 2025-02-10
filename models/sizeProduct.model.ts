import slug from "mongoose-slug-updater";
import mongoose from "mongoose";
import { STATUS } from "../constants/enum";

const sizeProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: { type: String, slug: "name", unique: true },
    status: {
      type: String,
      enum: Object.values(STATUS),
      trim: true,
      default: STATUS.ACTIVE,
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
mongoose.plugin(slug);

const SizeProduct = mongoose.model("SizeProduct", sizeProductSchema);

export default SizeProduct;
