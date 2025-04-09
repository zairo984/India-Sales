"use client";
import { Button } from "./ui/button";

import Certificates from "./certificate";
import Footer from "./Footer";
import HeroCarousel from "./HeroCarousal";
import { FaWhatsapp } from "react-icons/fa";
// import Link from "next/link";
// import { Link2 } from "lucide-react";

const Hero = () => {
	function handleEnquiry() {
		const phoneNumber = "918009005768"; // No "+" or spaces
		const message = encodeURIComponent(
			`Hi, I am interested in your Products. Can you share more details?`
		);
		const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

		if (typeof window !== "undefined") {
			window.open(whatsappURL, "_blank", "noopener,noreferrer");
		}
	}

	return (
		<div className="absolute top-0 overflow-hidden">
			<div>
				<HeroCarousel />
			</div>
			<div className="relative overflow-hidden">
				<div className="fixed bottom-4 right-4 z-10">
					<div
						
						className="bg-green-500 w-16 rounded-full  flex justify-center items-center opacity-70  m-8 shadow-lg shadow-green-400"
					>
						<FaWhatsapp onClick={ handleEnquiry} className="text-white text-5xl m-2" />
					</div>
				</div>

				<div className=" flex flex-wrap w-full text-center items-center justify-center">
					<div
						style={{ backgroundImage: "url('/main_horse.jpg')" }}
						className="bg-cover w-[100%] sm:w-[50%] bg-center h-[800px]  text-white flex flex-col items-center justify-center"
					>
						{/* <h1 className="text-2xl font-bold ">Trending</h1> */}
						<h1 className="text-5xl font-extrabold">
							All Products
						</h1>
						<p className=" xl font-light w-[70%] lg:w-[60%] ">
							Discover top-quality products designed to enhance
							the performance, comfort, and well-being of both
							horses and riders.
						</p>
						<Button
							className="bg-transparent border-2 w-[30%] border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
							onClick={() => [
								(window.location.href = "/products"),
							]}
						>
							Discover Now
						</Button>
					</div>
					<div className="flex flex-col w-[100%] sm:w-[50%]">
						<div
							style={{ backgroundImage: "url('/horse2.jpg')" }}
							className="bg-cover bg-center h-[400px] w-full  text-white flex flex-col items-center justify-center"
						>
							{/* <h1 className="text-2xl font-bold ">Trending</h1> */}
							<h1 className="text-5xl font-extrabold">Horses</h1>
							<p className=" xl font-light w-[70%] lg:w-[60%] ">
								Give your horse the best care and comfort with
								our top-quality gear and accessories. Whether
								for training, competition, or daily care, we
								have everything your horse needs.
							</p>
							<Button
								className="bg-transparent border-2 w-[30%] text-yellow-400
					 border-yellow-400 hover:bg-yellow-400 hover:text-black"
								onClick={() => {
									window.location.href = "/products/horse";
								}}
							>
								Discover Now
							</Button>
						</div>
						<div
							style={{ backgroundImage: "url('/rider.jpg')" }}
							className="bg-cover bg-center h-[400px] w-full  text-white flex flex-col items-center justify-center"
						>
							{/* <h1 className="text-2xl font-bold ">Trending</h1> */}
							<h1 className="text-5xl font-extrabold">Riders</h1>
							<p className=" xl font-light w-[70%] lg:w-[60%] ">
								Ride with confidence and style using our premium
								selection of equestrian gear tailored for riders
								of all levels.
							</p>
							<Button
								className="bg-transparent border-2 w-[30%] border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
								onClick={() => [
									(window.location.href = "/products/rider"),
								]}
							>
								Discover Now
							</Button>
						</div>
					</div>
				</div>

				<Certificates />
			</div>

			<Footer />
		</div>
	);
};
export default Hero;
