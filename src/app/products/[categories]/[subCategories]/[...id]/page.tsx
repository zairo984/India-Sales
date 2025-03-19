"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PrismaZoom from "react-prismazoom";

export default function Home() {
	const [category, setCategory] = useState<{
		name: string;
		description: string;
		imageUrl: string;
		category: string;
		price: number;
		quantity: number;
		subCategory: string;
	} | null>(null);

	const [isModalOpen, setIsModalOpen] = useState(false);

	// Function to fetch product details
	const params = useParams();
	const id = params?.id;

	function handleEnquiry(productName: string) {
		const phoneNumber = "918009005768"; // No "+" or spaces
		const message = encodeURIComponent(
		  `Hi, I am interested in "${productName}". Can you share more details?`
		);
		const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
	  
		if (typeof window !== "undefined") {
		  window.open(whatsappURL, "_blank", "noopener,noreferrer");
		}
	  }
	  
	  
	  

	async function getProducts() {
		if (!id) return;

		try {
			const res = await axios.get(`/api/products/${id}`);
			setCategory(res?.data);
		} catch (err) {
			console.error("Error fetching product:", err);
		}
	}

	// Fetch product details when the page loads
	useEffect(() => {
		getProducts();
	}, [id]);

	const handleImageClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="m-3 p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl">
				<div className="flex h-20 bg-slate-400 justify-center items-center rounded-md">
					<h1 className="text-xl font-semibold text-white">Product Details</h1>
				</div>

				{category ? (
					<div className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg shadow-md mt-6">
						{/* Image Section */}
						<div className="w-full md:w-1/2 flex justify-center items-center cursor-pointer">
							<img
								src={category.imageUrl}
								alt={category.name}
								className="w-72 h-72 object-cover rounded-lg shadow-lg"
								onClick={handleImageClick}
							/>
						</div>

						{/* Details Section */}
						<div className="w-full md:w-1/2 p-6">
							<h2 className="text-2xl font-semibold text-gray-900">{category.name}</h2>
							<p className="text-gray-600 text-lg mt-2">{category.description}</p>
							<div className="mt-4 space-y-3">
								<p className="text-lg">
									<strong className="text-gray-800">Category:</strong> {category.category}
								</p>
								<p className="text-lg">
									<strong className="text-gray-800">Subcategory:</strong> {category.subCategory}
								</p>
								<Button
									onClick={() => handleEnquiry(category.name)}
									className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
								>
									Enquire <FaWhatsapp />
								</Button>
							</div>
						</div>
					</div>
				) : (
					<div className="flex justify-center items-center mt-10">
						<Loader type="dots" size={40} color="#ef4444" />
					</div>
				)}

				{isModalOpen && (
					<div
						className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
						onClick={handleCloseModal}
					>
						<div className="bg-white p-4 rounded-lg max-w-3xl" onClick={(e) => e.stopPropagation()}>
							<PrismaZoom>
								<img src={category?.imageUrl} alt={category?.name} className="w-full h-auto" />
							</PrismaZoom>
							<button
								onClick={handleCloseModal}
								className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}