import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Certification from "@/models/certificates";
import { writeFile } from "fs/promises";
import path from "path";

// Connect to MongoDB
connectDB();

export async function GET() {
    try {
      const certifications = await Certification.find().sort({ uploadedAt: -1 });
      return NextResponse.json(certifications, { status: 200 });
    } catch (error) {
      console.error("Fetch error:", error);
      return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
  }
  

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const certName = formData.get("certName") as string;
    const file = formData.get("file") as File;

    if (!certName || !file) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Define file storage path
    const filePath = path.join("./public/uploads", file.name);
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    // Save file details in MongoDB
    const newCert = await Certification.create({
      certName,
      fileUrl: `/uploads/${file.name}`,
    });

    return NextResponse.json(
      { message: "Certification uploaded successfully!", certification: newCert },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Upload failed", error }, { status: 500 });
  }
}
