import mongoose from "mongoose";
import { STATUS } from "../constants/enum";

const cartSchema = new mongoose.Schema(
     {
          customerId: mongoose.SchemaTypes.ObjectId,
          productItemId: mongoose.SchemaTypes.ObjectId,
          quantity: Number,
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
     },
     {
          timestamps: true,
          autoCreate: true,
     }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
