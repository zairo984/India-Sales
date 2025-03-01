import { Schema, Document, models, model } from "mongoose";

export interface Product extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  quantity?: number;
  category?: string;
  subCategory?: string;
  createdAt: Date;
}

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    category: { type: String },
    subCategory: { type: String },
  },
  { timestamps: true }
);

// ✅ FIX: Prevent re-compiling the model
const Product = models.Product || model<Product>("Product", productSchema);

export default Product;
