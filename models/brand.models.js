import mongoose, { Schema } from "mongoose";
const BrandSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);
export const Brands = mongoose.model("Brands", BrandSchema);
