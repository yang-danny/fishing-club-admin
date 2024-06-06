import mongoose from "mongoose";
import Brand from "./Brand";

const ProductSchema = new mongoose.Schema({
  title: String,
  // brand: { type: mongoose.Schema.Types.ObjectId,
  //   ref: Brand.modelName, required: true },
  brand: String,
  description: String,
  media: [String],
  category: String,
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  tags: [String],
  sizes: [String],
  colors: [String],
  price: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  expense: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  rating: { type: Number, required: true, default: 0 },
  reviews: { type: Number, required: true, default: 0 },
  instock: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;