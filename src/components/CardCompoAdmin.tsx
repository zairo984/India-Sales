"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { FaWhatsapp } from "react-icons/fa";

type CardProps = {
	title: string;
	description?: string;
	imageUrl?: string;
	id?: string;
};

const AdminCard: React.FC<CardProps> = ({
	title,
	description,
	imageUrl,
	id
	
}) => {
	// const handleOnClick = async (id: string | undefined) => {
	// 	if (!id) {
	// 		console.error("Invalid ID: ID is undefined");
	// 		return;
	// 	}

	// 	console.log("Card clicked with ID:", id);
	// 	try {
	// 		const response = await axios.get(`/api/products/${id}`);
	// 		console.log("Response of card click: ", response.data);
	// 	} catch (err) {
	// 		console.error("Error fetching product:", err);
	// 	}
	// };
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
	  

	return (
		<div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
			<Card className="group relative  m-2  overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
				{/* Image Section */}
				<div className="w-full h-[250px]  flex items-center justify-center overflow-hidden">
					<img
						src={imageUrl || "https://via.placeholder.com/300"}
						alt={title}
						className="w-full h-auto max-h-full object-contain"
					/>
				</div>

				{/* Card Content */}
				<CardHeader className="p-4">
					<CardTitle className="text-lg font-semibold text-gray-800">
						{title}
					</CardTitle>
					<CardContent className="text-sm text-gray-600 line-clamp-2">
						{description}
					</CardContent>
				</CardHeader>

				{/* Card Footer */}
				<CardFooter className="p-4 justify-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:-translate-y-5 transition-all gap-2 duration-500">
					<Button
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
						onClick={() => {
							window.location.href = `products/${id}`;
						}} // ✅ Pass id directly
					>
						View Details
					</Button>
					<Button
						onClick={() =>
							handleEnquiry(title)
						}
						className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
					>
						Enquire <FaWhatsapp />
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
export { AdminCard };
