import React from "react";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

type CardProps = {
	title: string;
	description?: string;
	imageUrl?: string;
	id?: string;
};

const CardCompo: React.FC<CardProps> = ({
	title,
	description,
	imageUrl,
	id,
}) => {
	return (
		<div className="w-[60%] lg:w-[30%]">
			<Card className="w-full lg:w-[80%] h-[400px] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col ">
				{/* Image Section */}
				<div className="w-full h-[250px]  flex items-center justify-center overflow-hidden">
					<img
						src={imageUrl || "https://via.placeholder.com/300"}
						alt={title}
						className="w-full h-auto max-h-full object-contain"
					/>
				</div>

				{/* Card Content */}
				<CardHeader className=" flex flex-col items-center">
					<CardTitle className="text-lg font-bold truncate">
						{title.toUpperCase()}
					</CardTitle>
					<CardDescription className="text-sm hidden text-gray-600 ">
						{description}
						{id}
					</CardDescription>
				</CardHeader>

				{/* Card Footer - Button */}
				<CardFooter className="p-4 w-full flex justify-center">
					<Button
						onClick={() => {
							window.location.href = `/products/categories/${title.toLowerCase()}`;
						}}
						className="bg-blue-500 hover:bg-blue-600 w-full text-white px-4 py-2 rounded-md"
					>
						View More
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default CardCompo;
