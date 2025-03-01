import React from "react";
import {
	Card,
	CardContent,
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
	id?:string
}

const CardCompo:React.FC<CardProps> = ({title,description,imageUrl,id}) => {
	return (
		<div className="flex justify-center items-center w-full xs:w-1/2 sm:w-1/3 lg:w-1/4 p-4">
	<Card className="w-full h-[400px] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col">
		{/* Image Section */}
		<div className="w-full h-[250px] bg-gray-100 flex items-center justify-center overflow-hidden">
	<img
		src={imageUrl || "https://via.placeholder.com/300"}
		alt={title}
		className="w-full h-auto max-h-full object-contain"
	/>
</div>

		{/* Card Content */}
		<CardHeader className="p-4 flex-1 flex flex-col justify-between">
			<CardTitle className="text-lg font-bold truncate">{title}</CardTitle>
			<CardDescription className="text-sm text-gray-600 line-clamp-2">
				{description}
			</CardDescription>
		</CardHeader>

		{/* Card Footer - Button */}
		<CardFooter className="p-4 flex justify-end">
			<Button
				onClick={() => {
					window.location.href = `/products/categories/${title.toLowerCase()}`;
				}}
				className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
			>
				View More
			</Button>
		</CardFooter>
	</Card>
</div>

	);
};

export default CardCompo;
