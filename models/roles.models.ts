import { model, Schema } from "mongoose";
import { STATUS } from "../constants/enum";
import mongoose from "mongoose";

const rolesSchema = new Schema(
  {
    name: String,
    description: String,
    permission: Array,
    deleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: STATUS.ACTIVE,
    },
    createdBy: mongoose.SchemaTypes.ObjectId,
    deletedBy: mongoose.SchemaTypes.ObjectId,
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Role = model("Role", rolesSchema);

export default Role;
