import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Name Required"],
    },
    price: {
      type: "Number",
      min: 0,
      required: [true, "Price Required"],
    },
    description: {
      type: "String",
      required: [true, "Description Required"],
    },
    image: {
      type: "String",
      required: [true, "Image Required"],
    },
    category: {
      type: "String",
      required: [true, "Category Required"],
    },
    isFeatured: {
      type: "Boolean",
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
