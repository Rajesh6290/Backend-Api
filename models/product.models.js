import mongoose, { Schema } from "mongoose";
// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
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
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Category",
    // },
    category: {
      type: String,
      required: true,
    },
    // brand: {
    //   type: String,
    //   enum: ["Apple", "Samsung", "Google"],
    // },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },

    color: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
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
