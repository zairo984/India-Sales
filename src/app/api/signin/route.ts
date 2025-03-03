import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


connectDB();

// Ensure correct path to DB connection

export async function POST(req: NextRequest) {
	try {
		await connectDB(); // ✅ Ensure database connection

		const body = await req.json();
		// console.log("Login Request:", body);

		// ✅ Find user by email
		const user = await User.findOne({ email: body.email });
		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		// ✅ Compare password using bcrypt
		const isMatch = body.password === user.password;
		if (!isMatch) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		// ✅ Generate JWT token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

		// ✅ Send token in HttpOnly cookie (More secure)
		const response = NextResponse.json({ message: "Success", token });
		response.headers.append(
			"Set-Cookie",
			`IndiaSalestoken=${token}; HttpOnly; Path=/; Max-Age=86400`
		);

		return response;
	} catch (err) {
		console.error("Error during login:", err);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}
