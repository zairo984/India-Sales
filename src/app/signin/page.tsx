"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SignInPage = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (error) setError("");
	};

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setError("");
			setIsLoading(true);

			try {
				const response = await axios.post("/api/signin", formData);
				const { token } = response.data;
				
				if (token) {
					localStorage.setItem("IndiaSalestoken", token);
					router.push("/admin");
				}
			} catch (err) {
				if (axios.isAxiosError(err)) {
					setError(err.response?.data?.message || "Invalid credentials");
				} else {
					setError("An error occurred. Please try again.");
				}
			} finally {
				setIsLoading(false);
			}
		},
		[formData, router]
	);

	return (
		<div className="min-h-screen flex items-center justify-center bg-black px-4">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="text-center mb-8">
					<Image
						src="/images/logo.jpg"
						alt="India Sales Logo"
						width={120}
						height={80}
						className="mx-auto mb-4"
					/>
					<h1 className="text-2xl font-bold text-white">Admin Login</h1>
					<p className="text-gray-400 mt-2">Sign in to manage your products</p>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className="bg-white rounded-xl shadow-xl p-8 space-y-6"
				>
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Email Address
						</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="admin@indiasales.co"
								className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
								required
								autoComplete="email"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Password
						</label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								value={formData.password}
								onChange={handleChange}
								placeholder="Enter your password"
								className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
								required
								autoComplete="current-password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5" />
								) : (
									<Eye className="w-5 h-5" />
								)}
							</button>
						</div>
					</div>

					<Button
						type="submit"
						className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-all"
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Loader2 className="w-5 h-5 animate-spin mr-2" />
								Signing in...
							</>
						) : (
							"Sign In"
						)}
					</Button>
				</form>

				<p className="text-center text-gray-500 mt-6 text-sm">
					Protected area for authorized personnel only
				</p>
			</div>
		</div>
	);
};

export default SignInPage;
