import { Schema, Document, models, model } from "mongoose";

export interface ISubCategory extends Document {
  name: string;
  category: string;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
}

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

// Use existing model if already compiled
const SubCategory = models.SubCategory || model<ISubCategory>("SubCategory", subCategorySchema);

export default SubCategory;
