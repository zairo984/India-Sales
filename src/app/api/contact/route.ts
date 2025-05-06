import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
	try {
		// console.log(req.body);
		const { email,message,name,phoneNumber } = await req.json(); // ✅ Parse request body
		const to = process.env.RECEIVER_EMAIL;
		const subject = "India Sales Contact Form";
		const text = `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nMessage: ${message}`;
		const html = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone Number: ${phoneNumber}</p><p>Message: ${message}</p>`;

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS, // Ensure you're using an App Password
			},
		});

		const mailOptions = {
			from: `"India Sales" <${process.env.EMAIL_USER}>`,
			to,
			replyTo: process.env.EMAIL_USER,
			subject,
			text,
			html,
		};

		await transporter.sendMail(mailOptions);
		// console.log("Email sent:", info.response);

		return NextResponse.json({ success: true, message: "Email sent successfully" });
	} catch (error: unknown) {
		console.error("Error sending email:", error);

		const errorMessage =
			error instanceof Error ? error.message : "An unknown error occurred";

		return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
	}
}
