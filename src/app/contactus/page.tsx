"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { PhoneInputLayout } from "@/components/phoneInputLayout";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const CONTACT_INFO = {
	email: "faraz@indiasales.co",
	phones: ["+91 8009005768", "+91 8009494503"],
	workAddress: "18/1 A-1, Pokharpur, Jajmau, Kanpur - INDIA - 208010",
	headOffice: "40/120 Hospital Road, Parade, Kanpur - INDIA - 208001",
};

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = useCallback(() => {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		} else if (formData.message.length < 10) {
			newErrors.message = "Message must be at least 10 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [formData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) return;

		setLoading(true);
		const fullFormData = { ...formData, phoneNumber: phone };

		try {
			const response = await axios.post("/api/contact", fullFormData);
			toast.success(response.data.message || "Message sent successfully!");
			setFormData({ name: "", email: "", message: "" });
			setPhone("");
		} catch (err) {
			const errorMessage = axios.isAxiosError(err)
				? err.response?.data?.message || "Failed to send message"
				: "An error occurred. Please try again.";
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleWhatsApp = () => {
		const message = encodeURIComponent("Hi, I would like to get in touch with India Sales.");
		window.open(`https://wa.me/918009005768?text=${message}`, "_blank", "noopener,noreferrer");
	};

	return (
		<div className="min-h-screen bg-black">
			<ToastContainer position="top-right" autoClose={5000} />

			{/* Header */}
			<div className="text-center py-12">
				<h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
				<p className="text-gray-400 max-w-xl mx-auto px-4">
					Have questions about our products? We&apos;d love to hear from you!
				</p>
			</div>

			<div className="container mx-auto px-4 pb-16">
				<div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
					{/* Contact Information */}
					<div className="space-y-8">
						<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
							<h2 className="text-2xl font-semibold text-white mb-6">Get In Touch</h2>

							<div className="space-y-6">
								<a
									href={`mailto:${CONTACT_INFO.email}`}
									className="flex items-center gap-4 text-gray-300 hover:text-yellow-400 transition-colors group"
								>
									<div className="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors">
										<Mail className="w-5 h-5 text-yellow-400" />
									</div>
									<div>
										<p className="text-sm text-gray-500">Email</p>
										<p className="font-medium">{CONTACT_INFO.email}</p>
									</div>
								</a>

								{CONTACT_INFO.phones.map((phone, index) => (
									<a
										key={phone}
										href={`tel:${phone.replace(/\s/g, "")}`}
										className="flex items-center gap-4 text-gray-300 hover:text-green-400 transition-colors group"
									>
										<div className="w-12 h-12 bg-green-400/10 rounded-full flex items-center justify-center group-hover:bg-green-400/20 transition-colors">
											<Phone className="w-5 h-5 text-green-400" />
										</div>
										<div>
											<p className="text-sm text-gray-500">Phone {index + 1}</p>
											<p className="font-medium">{phone}</p>
										</div>
									</a>
								))}

								<div className="flex items-start gap-4 text-gray-300">
									<div className="w-12 h-12 bg-blue-400/10 rounded-full flex items-center justify-center flex-shrink-0">
										<MapPin className="w-5 h-5 text-blue-400" />
									</div>
									<div>
										<p className="text-sm text-gray-500">Head Office</p>
										<p className="font-medium">{CONTACT_INFO.headOffice}</p>
									</div>
								</div>

								<div className="flex items-start gap-4 text-gray-300">
									<div className="w-12 h-12 bg-purple-400/10 rounded-full flex items-center justify-center flex-shrink-0">
										<MapPin className="w-5 h-5 text-purple-400" />
									</div>
									<div>
										<p className="text-sm text-gray-500">Work Address</p>
										<p className="font-medium">{CONTACT_INFO.workAddress}</p>
									</div>
								</div>
							</div>

							{/* WhatsApp Button */}
							<Button
								onClick={handleWhatsApp}
								className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-6 text-lg gap-3"
							>
								<FaWhatsapp className="text-xl" />
								Chat on WhatsApp
							</Button>
						</div>
					</div>

					{/* Contact Form */}
					<div className="bg-white rounded-xl p-8 shadow-xl">
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">Send a Message</h2>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
									Name *
								</label>
								<input
									id="name"
									type="text"
									name="name"
									placeholder="Your name"
									value={formData.name}
									onChange={handleChange}
									className={`w-full border p-4 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
										errors.name
											? "border-red-500 focus:ring-red-400"
											: "border-gray-300 focus:ring-yellow-400"
									}`}
									aria-invalid={!!errors.name}
									aria-describedby={errors.name ? "name-error" : undefined}
								/>
								{errors.name && (
									<p id="name-error" className="text-red-500 text-sm mt-1">
										{errors.name}
									</p>
								)}
							</div>

							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
									Email *
								</label>
								<input
									id="email"
									type="email"
									name="email"
									placeholder="your.email@example.com"
									value={formData.email}
									onChange={handleChange}
									className={`w-full border p-4 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
										errors.email
											? "border-red-500 focus:ring-red-400"
											: "border-gray-300 focus:ring-yellow-400"
									}`}
									aria-invalid={!!errors.email}
									aria-describedby={errors.email ? "email-error" : undefined}
								/>
								{errors.email && (
									<p id="email-error" className="text-red-500 text-sm mt-1">
										{errors.email}
									</p>
								)}
							</div>

							<div>
								<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
									Phone (optional)
								</label>
								<PhoneInputLayout
									placeholder="Enter phone number"
									value={phone}
									onChange={(value) => setPhone(value || "")}
									className="w-full border border-gray-300 p-4 rounded-lg focus-within:ring-2 focus-within:ring-yellow-400"
								/>
							</div>

							<div>
								<label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
									Message *
								</label>
								<textarea
									id="message"
									name="message"
									rows={5}
									placeholder="Tell us about your requirements..."
									value={formData.message}
									onChange={handleChange}
									className={`w-full border p-4 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
										errors.message
											? "border-red-500 focus:ring-red-400"
											: "border-gray-300 focus:ring-yellow-400"
									}`}
									aria-invalid={!!errors.message}
									aria-describedby={errors.message ? "message-error" : undefined}
								/>
								{errors.message && (
									<p id="message-error" className="text-red-500 text-sm mt-1">
										{errors.message}
									</p>
								)}
							</div>

							<Button
								type="submit"
								className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 rounded-lg transition-colors gap-2"
								disabled={loading}
							>
								{loading ? (
									<>
										<Loader2 className="w-5 h-5 animate-spin" />
										Sending...
									</>
								) : (
									<>
										<Send className="w-5 h-5" />
										Send Message
									</>
								)}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}