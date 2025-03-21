import { model, Schema, Types } from "mongoose";
import { STATUS } from "../constants/enum";
import mongoose from "mongoose";
const pathSchema = new Schema(
  {
    ADMIN: {},
    CLIENT: {},
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Path = model("Path", pathSchema);

export default Path;
