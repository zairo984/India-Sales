import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Certification from "@/models/certificates";

export async function GET() {
  try {
    await connectDB();
    const certifications = await Certification.find().sort({ uploadedAt: -1 });
    return NextResponse.json(certifications, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    console.log(body)
    const certName = body.certName as string;
    const fileUrl = body.fileUrl;
 // Getting the image URL from the frontend

    if (!certName || !fileUrl) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Save data in MongoDB
    const newCert = await Certification.create({
      certName,
      fileUrl, // Directly store the image URL
    });

    return NextResponse.json(
      {
        message: "Certification uploaded successfully!",
        certification: newCert,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Upload failed", error }, { status: 500 });
  }
}
