import mongoose, { Schema, Document } from "mongoose";

export interface ICertification extends Document {
  certName: string;
  fileUrl: string;
  uploadedAt: Date;
}

const CertificationSchema = new Schema<ICertification>(
  {
    certName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Certification ||
  mongoose.model<ICertification>("Certification", CertificationSchema);
