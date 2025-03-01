import slug from "mongoose-slug-updater";
import mongoose from "mongoose";
import { STATUS } from "../constants/enum";

const productsSchema = new mongoose.Schema(
  {
    categoryId: {
      type: [mongoose.SchemaTypes.ObjectId],
      required: true,
    },
    name: String,
    slug: { type: String, slug: "name", unique: true },

    description: {
      type: String,
      // required: true
    },
    descriptionShort: {
      type: String,
      // required: true
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
      // required: true
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    updatedBy: {
      type: mongoose.SchemaTypes.ObjectId,
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

const Product = mongoose.model("Product", productsSchema);

export default Product;
