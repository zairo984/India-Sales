"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { Eye } from "lucide-react";

const WHATSAPP_NUMBER = "918009005768";

interface CardProps {
	title: string;
	description?: string;
	imageUrl?: string;
	id?: string;
}

const AdminCard: React.FC<CardProps> = ({
	title,
	description,
	imageUrl,
	id,
}) => {
	const handleEnquiry = useCallback(() => {
		const message = encodeURIComponent(
			`Hi, I am interested in "${title}". Can you share more details?`
		);
		window.open(
			`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
			"_blank",
			"noopener,noreferrer"
		);
	}, [title]);

	return (
		<Card className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
			{/* Image Section */}
			<div className="relative w-full h-[220px] overflow-hidden bg-white">
				<Image
					src={imageUrl || "/placeholder-product.jpg"}
					alt={title}
					fill
					className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
				/>
			</div>

			{/* Card Content */}
			<CardHeader className="p-4 pb-2">
				<CardTitle className="text-lg text-center font-semibold text-gray-800 line-clamp-2 min-h-[56px]">
					{title}
				</CardTitle>
				{description && (
					<CardContent className="text-sm text-gray-600 line-clamp-2 p-0 mt-1">
						{description}
					</CardContent>
				)}
			</CardHeader>

			{/* Card Footer */}
			<CardFooter className="p-4 pt-2 flex flex-col sm:flex-row gap-2">
				<Button
					asChild
					className="flex-1 bg-gray-900 hover:bg-yellow-500 text-white hover:text-black transition-colors gap-2"
				>
					<Link href={`products/${id}`}>
						<Eye className="h-4 w-4" />
						View Details
					</Link>
				</Button>
				<Button
					onClick={handleEnquiry}
					className="flex-1 bg-green-500 hover:bg-green-600 text-white gap-2"
					aria-label={`Enquire about ${title} on WhatsApp`}
				>
					Enquire <FaWhatsapp />
				</Button>
			</CardFooter>
		</Card>
	);
};

export { AdminCard };
