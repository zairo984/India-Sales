import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface CardProps {
	title: string;
	description?: string;
	imageUrl?: string;
	id?: string;
}

const CardCompo: React.FC<CardProps> = ({
	title,
	description,
	imageUrl,
}) => {
	return (
		<Card className="w-full max-w-sm bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
			{/* Image Section */}
			<div className="relative w-full h-[220px] overflow-hidden bg-gray-100">
				<Image
					src={imageUrl || "/placeholder-product.jpg"}
					alt={title}
					fill
					className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				/>
			</div>

			{/* Card Content */}
			<CardHeader className="p-4 text-center">
				<CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 min-h-[56px]">
					{title.toUpperCase()}
				</CardTitle>
				{description && (
					<CardDescription className="text-sm text-gray-600 line-clamp-2 mt-2">
						{description}
					</CardDescription>
				)}
			</CardHeader>

			{/* Card Footer - Button */}
			<CardFooter className="p-4 pt-0">
				<Button
					asChild
					className="w-full bg-gray-900 hover:bg-yellow-500 text-white hover:text-black transition-colors group/btn"
				>
					<Link href={`/products/categories/${title.toLowerCase()}`}>
						<span>View More</span>
						<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CardCompo;
