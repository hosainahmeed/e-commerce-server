import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variant",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtAddTime: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
}, { timestamps: true });


const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  items: [CartItemSchema],
  subtotal: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "BDT",
  },
}, { timestamps: true });

CartSchema.pre("save", function (next) {
  this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  next();
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart
