import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs"; // ✅ Force Next.js to use Node.js runtime

export async function POST(req: NextRequest) {
	try {
		// ✅ Parse FormData properly
		const formData = await req.formData();
		const file = formData.get("image") as File; // Get the uploaded file

		// ❌ Validate File
		if (!file) {
			return NextResponse.json(
				{ error: "No file uploaded" },
				{ status: 400 }
			);
		}

		// ✅ Convert file to Buffer
		const bytes = await file.arrayBuffer(); // Convert to raw bytes
		const buffer = Buffer.from(bytes); // Convert bytes to Buffer

		// ✅ Ensure Upload Directory Exists
		const uploadDir = path.join(process.cwd(), "public", "uploads");
		await fs.mkdir(uploadDir, { recursive: true }); // Create folder if missing

		// ✅ Generate Unique File Name
		const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
		const filePath = path.join(uploadDir, filename); // Full path

		// ✅ Save File to Disk
		await fs.writeFile(filePath, buffer);

		// ✅ Return Uploaded Image URL
		return NextResponse.json({
			imageUrl: `/uploads/${filename}`,
		});
	} catch (error) {
		console.error("Error uploading image:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
