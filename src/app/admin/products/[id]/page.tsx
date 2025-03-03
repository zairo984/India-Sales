"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar"; // Ensure correct path
import axios from "axios";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";

const Admin = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [category, setCategory] = useState<{
		name: string;
		description: string;
		imageUrl: string;
		category: string;
		price: number;
		quantity: number;
		subCategory: string;
	} | null>(null);

	const params = useParams();
	const id = params?.id;
	// console.log("id", id);

	async function getCategory() {
		if (!id) return;

		try {
			const res = await axios.get(`/api/products/${id}`);
			// console.log("Fetched Product:", res.data);
			setCategory(res?.data);
		} catch (err) {
			console.error("Error fetching product:", err);
		}
	}

	useEffect(() => {
		getCategory();
	}, [id]);
	// console.log("category", category);

	return (
		<div className="flex">
			{/* Sidebar */}
			<Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

			{/* Main Content Area */}
			<div
				className={`flex flex-col m-3 p-6 bg-white shadow-lg rounded-lg transition-all duration-300 ${
					isSidebarOpen ? "ml-[250px] w-[calc(100%-250px)]" : "ml-0 w-full"
				}`}
			>
				<div className="flex h-20 bg-slate-400 border-3 justify-center items-center">
				<h1 className="text-2xl text-center font-bold">
					Admin Dashboard
				</h1>
				</div>

				{/* Product Details */}
				{category ? (
					<div className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg shadow-md">
						{/* Image Section */}
						<div className="w-full md:w-1/2 flex justify-center items-center">
							<img
								src={category.imageUrl}
								alt={category.name}
								className="w-72 h-72 object-cover rounded-lg shadow-lg"
							/>
						</div>

						{/* Details Section */}
						<div className="w-full md:w-1/2 p-6">
							<h2 className="text-2xl font-semibold text-gray-900">
								{category.name}
							</h2>
							<p className="text-gray-600 text-lg mt-2">
								{category.description}
							</p>

							<div className="mt-4 space-y-3">
								<p className="text-lg">
									<strong className="text-gray-800">Category:</strong>{" "}
									{category.category}
								</p>
								<p className="text-lg">
									<strong className="text-gray-800">Subcategory:</strong>{" "}
									{category.subCategory}
								</p>
								<p className="text-lg">
									<strong className="text-gray-800">Price:</strong> $
									{category.price}
								</p>
								<p className="text-lg">
									<strong className="text-gray-800">Stock Quantity:</strong>{" "}
									{category.quantity}
								</p>
							</div>
						</div>
					</div>
				) : (
					<Loader type="dots" size={40} color="#ef4444" />
				)}
			</div>
		</div>
	);
};

export default Admin;
