import { Schema, model } from "mongoose";
const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Cart = model("Cart", CartSchema);
