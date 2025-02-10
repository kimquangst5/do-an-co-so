import slug from "mongoose-slug-updater";
import mongoose from "mongoose";
import { STATUS } from "../constants/enum";

const productsCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    parentId: {
      type: mongoose.Schema.Types.Mixed,
      default: "",
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      required: true,
      default: STATUS.ACTIVE,
    },
    position: {
      type: Number,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    deletedBy: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
    autoSearchIndex: true,
  }
);

mongoose.plugin(slug);

const ProductCategory = mongoose.model(
  "ProductCategory",
  productsCategoriesSchema
);

export default ProductCategory;
