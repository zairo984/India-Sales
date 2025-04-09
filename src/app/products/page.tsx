"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
	Card,
	// CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

interface Product {
	id: string;
	name: string;
	category: string;
	subCategory: string;
	description: string;
	price: number;
	quantity: number;
	imageUrl: string;
}


function handleEnquiry(productName: string) {
	const phoneNumber = "919876543210"; // Replace with actual WhatsApp number
	const message = encodeURIComponent(
		`Hi, I am interested in "${productName}". Can you share more details?`
	);
	const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
	window.open(whatsappURL, "_blank");
}

const ProductsPage = () => {
	const [products, setProducts] = useState<Product[]>([]);

	const fetchProducts = async () => {
		try {
			const res = await axios.get("/api/products");
			setProducts(res.data.products);
			// console.log("Fetched products:", res.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<div className="flex flex-wrap gap-6  justify-center p-6">
				{products.map((item) => (
					<Card
						key={item.id}
						className="group relative w-full md:w-[25%]  m-2  overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
					>
						{/* Image Section */}
						<div className="w-full h-[250px]  flex items-center justify-center overflow-hidden">
							<img
								src={
									item.imageUrl ||
									"https://via.placeholder.com/300"
								}
								alt={item.name}
								className="w-full h-auto max-h-full object-contain"
							/>
						</div>

						{/* Card Content */}
						<CardHeader className="p-4">
							<CardTitle className="text-lg text-center font-semibold text-gray-800">
								{item.name}
							</CardTitle>
							{/* <CardContent className="text-sm text-gray-600 line-clamp-2">
								{item.description}
							</CardContent> */}
						</CardHeader>

						{/* Card Footer */}
						<CardFooter className="p-4 justify-center  gap-2">
							<Button
								className="hover:bg-yellow-500 bg-white text-black px-4 py-2 rounded-md"
								onClick={() => {
									window.location.href = `products/${item.category}/${item.subCategory}/${item.id}`;
								}} // ✅ Pass id directly
							>
								View Details
							</Button>
							<Button
								onClick={() =>
									handleEnquiry(item.name)
								}
								className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
							>
								Enquire <FaWhatsapp />
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default ProductsPage;
