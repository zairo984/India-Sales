import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";

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
	id,
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

	return (
		<div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
			<Card className="w-full shadow-md border border-gray-300 bg-white rounded-lg">
				{/* Image Section */}
				<div className="w-full h-[250px] bg-gray-100 flex items-center justify-center overflow-hidden">
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
				<CardFooter className="p-4 flex justify-end">
					<Button
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
						onClick={() => {
							window.location.href = `products/${id}`;
						}} // ✅ Pass id directly
					>
						View Details
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
export { AdminCard };
