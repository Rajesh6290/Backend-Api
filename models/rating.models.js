import { Schema, model } from "mongoose";
const RatingSchema = new Schema(
  {
    star: { type: String, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    product: { type: Schema.Types.ObjectId, ref: "Products" },
  },
  { timestamps: true }
);
export const Ratings = model("Ratings", RatingSchema);
