import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  sku: String,
  price: Number,
  stock: Number,
  attributes: {
    color: String,
    size: String,
    weight: String,
    version: String,
  },
  images: [String],
}, { timestamps: true });

const Variant = mongoose.model("Variant", VariantSchema);
export default Variant