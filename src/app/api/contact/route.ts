import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, text: string, html: string) {
	const transporter = nodemailer.createTransport({
		service: "gmail", // No need to set SMTP manually
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS, // Use the App Password
		},
	});

	const mailOptions = {
		from: `"India Sales" <${process.env.EMAIL_USER}>`, // Gmail address
		to,
		replyTo: process.env.EMAIL_USER, // Ensure replies go to your email
		subject,
		text,
		html, 
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);
		return { success: true, message: "Email sent successfully" };
	} catch (error) {
		console.error("Error sending email:", error);
		return { success: false, message: "Failed to send email" };
	}
}
