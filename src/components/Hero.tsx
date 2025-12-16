"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import Certificates from "./certificate";
import Footer from "./Footer";
import HeroCarousel from "./HeroCarousal";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "918009005768";

interface HeroSectionProps {
	title: string;
	description: string;
	buttonText: string;
	href: string;
	backgroundImage: string;
	height?: string;
}

const HeroSection = ({ title, description, buttonText, href, backgroundImage, height = "h-[400px]" }: HeroSectionProps) => (
	<div className={`relative ${height} w-full overflow-hidden group`}>
		<Image
			src={backgroundImage}
			alt={title}
			fill
			className="object-cover transition-transform duration-500 group-hover:scale-105"
			priority
			sizes="(max-width: 640px) 100vw, 50vw"
		/>
		<div className="absolute inset-0 bg-black/40" />
		<div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
			<h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
				{title}
			</h2>
			<p className="text-base md:text-lg font-light max-w-md mb-6 drop-shadow-md">
				{description}
			</p>
			<Button
				asChild
				className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 px-8 py-3"
			>
				<Link href={href}>{buttonText}</Link>
			</Button>
		</div>
	</div>
);

const Hero = () => {
	const handleWhatsAppClick = useCallback(() => {
		const message = encodeURIComponent(
			"Hi, I am interested in your Products. Can you share more details?"
		);
		const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
		window.open(whatsappURL, "_blank", "noopener,noreferrer");
	}, []);

	return (
		<div className="relative">
			{/* Hero Carousel Section */}
			<section aria-label="Featured products carousel">
				<HeroCarousel />
			</section>

			{/* WhatsApp Floating Button */}
			<button
				onClick={handleWhatsAppClick}
				className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-400/50"
				aria-label="Contact us on WhatsApp"
			>
				<FaWhatsapp className="text-white text-3xl" />
			</button>

			{/* Product Categories Section */}
			<section className="grid grid-cols-1 sm:grid-cols-2" aria-label="Product categories">
				<HeroSection
					title="All Products"
					description="Discover top-quality products designed to enhance the performance, comfort, and well-being of both horses and riders."
					buttonText="Discover Now"
					href="/products"
					backgroundImage="/main_horse.jpg"
					height="h-[500px] sm:h-[800px]"
				/>
				
				<div className="flex flex-col">
					<HeroSection
						title="Horses"
						description="Give your horse the best care and comfort with our top-quality gear and accessories."
						buttonText="Discover Now"
						href="/products/horse"
						backgroundImage="/horse2.jpg"
					/>
					<HeroSection
						title="Riders"
						description="Ride with confidence and style using our premium selection of equestrian gear."
						buttonText="Discover Now"
						href="/products/rider"
						backgroundImage="/rider.jpg"
					/>
				</div>
			</section>

			{/* Certificates Section */}
			<section aria-label="Our certifications">
				<Certificates />
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default Hero;
