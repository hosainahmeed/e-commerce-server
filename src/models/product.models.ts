import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    brand: String,
    category: String,
    thumbnail: String,
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);