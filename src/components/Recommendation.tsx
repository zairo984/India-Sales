import React from "react";
import CardCompo from "@/components/CardCompo";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const recommendationsData = [
	{
		title: "Santorini, Greece",
		description: "Experience the breathtaking views of Santorini.",
		imageUrl: "https://source.unsplash.com/400x300/?santorini",
	},
	{
		title: "Swiss Alps, Switzerland",
		description: "A perfect winter getaway in the Swiss Alps.",
		imageUrl: "https://source.unsplash.com/400x300/?mountains",
	},
	{
		title: "Kyoto, Japan",
		description: "Discover the beautiful cherry blossoms of Kyoto.",
		imageUrl: "https://source.unsplash.com/400x300/?kyoto",
	},
];

const Recommendation: React.FC = () => {
	return (
		<div className="w-full max-w-7xl mx-auto p-6">
			{/* Section Title */}
			<h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
				Our Recommendations
			</h2>

			{/* Carousel Wrapper */}
			<div className="relative">
				<Carousel
					plugins={[
						Autoplay({
							delay: 2000, // Adjust autoplay speed for readability
							stopOnInteraction: true, // Pause when hovered
						}),
					]}
					className="w-full"
				>
					{/* Carousel Content */}
					<CarouselContent className="flex gap-6">
						{recommendationsData.map((item, index) => (
							<CarouselItem
								key={index}
								className="flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
							>
								<CardCompo {...item} />
							</CarouselItem>
						))}
					</CarouselContent>

					{/* Navigation Controls */}
					<CarouselPrevious className="absolute left-4 md:left-6 bg-gray-800 text-white hover:bg-gray-900 p-2 rounded-full shadow-lg" />
					<CarouselNext className="absolute right-4 md:right-6 bg-gray-800 text-white hover:bg-gray-900 p-2 rounded-full shadow-lg" />
				</Carousel>
			</div>
		</div>
	);
};

export default Recommendation;
