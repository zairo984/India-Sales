"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
import Loader from "@/components/Loader";
import { Dialog } from "@headlessui/react";

const Certificates: React.FC = () => {
	const [certificates, setCertificates] = useState<
		{ certName: string; fileUrl: string }[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// Fetch Certificates from API
	useEffect(() => {
		async function fetchCertificates() {
			try {
				const response = await axios.get("/api/certificates");
				setCertificates(response.data);
			} catch (error) {
				console.error("Error fetching certificates:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchCertificates();
	}, []);

	return (
		<div className="w-screen max-w-7xl mx-auto my-8 p-6">
			<h2 className="text-3xl font-bold text-center mb-6 text-white">
				Our Certificates
			</h2>

			{loading ? (
				<div className="flex justify-center items-center h-40">
					<Loader size={50} color="#3b82f6" type="spinner" />
				</div>
			) : certificates.length > 0 ? (
				<div className="relative w-full max-w-6xl mx-auto">
					<Carousel className="relative w-full overflow-hidden">
						<CarouselContent className="flex gap-6">
							{certificates.map((cert, index) => (
								<CarouselItem
									key={index}
									className="flex justify-center w-full md:basis-1/2 lg:basis-1/3"
								>
									<div
										className="bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer transition-all duration-300 hover:scale-105"
										onClick={() =>
											setSelectedImage(cert.fileUrl)
										}
										role="button"
										tabIndex={0}
										onKeyDown={(e) =>
											e.key === "Enter" &&
											setSelectedImage(cert.fileUrl)
										}
									>
										<img
											src={cert.fileUrl}
											alt={`Certificate: ${cert.certName}`}
											className="w-full h-64 object-cover rounded-lg mb-3"
										/>
										<h3 className="text-lg font-semibold text-gray-800">
											{cert.certName}
										</h3>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>

						<CarouselPrevious className="absolute left-4 md:left-6 bg-gray-800 text-white hover:bg-gray-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110" />
						<CarouselNext className="absolute right-4 md:right-6 bg-gray-800 text-white hover:bg-gray-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110" />
					</Carousel>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-40">
					<p className="text-center text-white text-lg font-medium">
						No certificates available.
					</p>
				</div>
			)}

			{/* Image Modal */}
			{selectedImage && (
				<Dialog
					open={!!selectedImage}
					onClose={() => setSelectedImage(null)}
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
				>
					<div className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full">
						<button
							onClick={() => setSelectedImage(null)}
							className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 p-2 rounded-full"
						>
							✖
						</button>
						<img
							src={selectedImage}
							alt="Certificate"
							className="w-full h-auto rounded-lg"
						/>
					</div>
				</Dialog>
			)}
		</div>
	);
};

export default Certificates;
