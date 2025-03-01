import { ShoppingBag } from "lucide-react";

import { Button } from "./ui/button";
import { useState } from "react";

const Hero = () => {
	const [fadedImage, setFadedImage] = useState(false);

	return (
		<div className=" h-[90.5vh] object-cover">
			<video
				src="/videos/horse-video-2.mp4"
				autoPlay
				muted
				loop
				// className={`opacity-100 h-[95vh] border border-green-700 -z-10 invisible md:visible ${
				//   fadedImage && "opacity-70"
				// }`}
				className=" h-full w-screen object-cover"
			></video>

			{/* <img
				src="/images/horse-img.jpg"
				alt="bg-image"
				className=" w-screen h-screen md:hidden"
			/> */}

			<Button
				variant={"secondary"}
				className=" absolute bottom-36 left-1/2 -translate-x-1/2 py-6 px-8 rounded-3xl"
				onMouseEnter={() => setFadedImage(true)}
				onMouseLeave={() => setFadedImage(false)}
				onClick={() => {
					window.location.href = "/products";
				}}
			>
				Products <ShoppingBag />{" "}
			</Button>
		</div>
	);
};
export default Hero;
