import mongoose, { Schema } from "mongoose";
// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
      trim: true,
    },
    slug: {
      type: "string",
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: "string",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brands",
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      required: true,
    },
    images: {
      type: Array,
      default: [],
      required: true,
    },

    color: {
      type: String,
      required: true,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    star: {
      type: String,
      default: 0,
    },
    totalRatings: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Products = mongoose.model("Products", productSchema);
