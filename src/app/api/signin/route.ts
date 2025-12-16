import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
	try {
		await connectDB();

		const body = await req.json();
		
		// Validate input
		if (!body.email || !body.password) {
			return NextResponse.json(
				{ message: "Email and password are required" },
				{ status: 400 }
			);
		}

		// Find user by email
		const user = await User.findOne({ email: body.email.toLowerCase().trim() });
		if (!user) {
			return NextResponse.json(
				{ message: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Compare password using bcrypt
		const isMatch = await bcrypt.compare(body.password, user.password);
		if (!isMatch) {
			return NextResponse.json(
				{ message: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Generate JWT token with more claims
		const token = jwt.sign(
			{ 
				id: user._id,
				email: user.email,
				role: user.role || "admin"
			}, 
			process.env.JWT_SECRET as string, 
			{ expiresIn: "1d" }
		);

		// Send token in HttpOnly cookie with security flags
		const isProduction = process.env.NODE_ENV === "production";
		const response = NextResponse.json({ message: "Success", token });
		response.headers.append(
			"Set-Cookie",
			`IndiaSalestoken=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${isProduction ? "; Secure" : ""}`
		);

		return response;
	} catch (err) {
		console.error("Error during login:", err);
		return NextResponse.json(
			{ message: "An error occurred. Please try again." },
			{ status: 500 }
		);
	}
}
