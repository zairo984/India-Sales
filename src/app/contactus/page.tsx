"use client";

import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);

	// Handle input change
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle form submit
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post("/api/contact", formData);
			toast.success(response.data.message);
			setFormData({ name: "", email: "", message: "" }); // Clear form
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "An unknown error occurred";
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<ToastContainer />
			<div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
				<h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
					Contact Us
				</h2>
				<p className="text-gray-600 text-center mb-6">
					Send us a message and we'll get back to you soon!
				</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						value={formData.name}
						onChange={handleChange}
						className="w-full border p-3 rounded-md"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						value={formData.email}
						onChange={handleChange}
						className="w-full border p-3 rounded-md"
						required
					/>
					<textarea
						name="message"
						rows={4}
						placeholder="Your Message"
						value={formData.message}
						onChange={handleChange}
						className="w-full border p-3 rounded-md"
						required
					></textarea>
					<Button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
					>
						{loading ? "Sending..." : "Send Message"}
					</Button>
				</form>
			</div>
		</div>
	);
}
