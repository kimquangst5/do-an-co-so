import { model, Schema } from "mongoose";
import { STATUS } from "../constants/enum";

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
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Role = model("Role", rolesSchema);

export default Role;
