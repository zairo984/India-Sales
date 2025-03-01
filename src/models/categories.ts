import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Use existing model if it exists, otherwise define it
const Category = models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
