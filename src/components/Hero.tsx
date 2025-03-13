
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

import Certificates from "./certificate";
import Footer from "./Footer";
import HeroCarousel from "./HeroCarousal";

const Hero = () => {

	return (
		<div className="absolute top-0 overflow-hidden">
			
			<div>
				<HeroCarousel />
			</div>

			<div className="flex flex-col pt-10 pb-10 text-center w-screen ">
				<h3 className="text-base font-thin font-sans text-white">
					FAVOURITES FROM EVERY CATEGORIES
				</h3>
				<h2 className="text-5xl font-extrabold text-white">Best Sellers</h2>
				<div>
					<Carousel className="relative w-screen pt-4 overflow-x-hidden">
						<CarouselContent className=" w-screen">
							{/* First Card */}
							<CarouselItem className="flex justify-center w-screen h-[400px] md:basis-1/2 lg:basis-1/3 ">
								<Card className="group relative  m-2 w-[70%]  overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
									{/* Image Section */}
									<div className="w-full h-[60%] md:h-[70%] flex items-center justify-center overflow-hidden">
										<img
											src="I.S.-BR. 102.jpg"
											alt="title"
											className="w-full h-full object-contain"
										/>
									</div>

									{/* Card Content */}
									<CardHeader className="p-4 flex-1 flex flex-col justify-between">
										<CardTitle className="text-base md:text-lg font-bold truncate">
											Sleeping Bag
										</CardTitle>
										<CardDescription className="text-sm text-black line-clamp-2">
											Description here...
										</CardDescription>
									</CardHeader>

									{/* Card Footer - Button */}
									<CardFooter className="p-4 justify-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:-translate-y-5 transition-all duration-500">
										<Button
											onClick={() => {
												window.location.href = `/products/Rider/products/67c29aa1630af4d30c1f83e9`;
											}}
											className="text-yellow-600 bg-transparent border-2 border-yellow-600 hover:bg-yellow-600 hover:text-black rounded-md"
										>
											View More
										</Button>
									</CardFooter>
								</Card>
							</CarouselItem>
							<CarouselItem className="flex justify-center w-full h-[400px] md:basis-1/2 lg:basis-1/3 ">
								<Card className="group relative  m-2 w-[70%]  overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
									{/* Image Section */}
									<div className="w-full h-[60%] md:h-[70%] flex items-center justify-center overflow-hidden">
										<img
											src="I.S. - F.M. 101.jpg"
											alt="title"
											className="w-full h-full object-contain"
										/>
									</div>

									{/* Card Content */}
									<CardHeader className="p-4 flex-1 flex flex-col justify-between">
										<CardTitle className="text-base md:text-lg font-bold truncate">
											Sleeping Bag
										</CardTitle>
										<CardDescription className="text-sm text-black line-clamp-2">
											Description here...
										</CardDescription>
									</CardHeader>

									{/* Card Footer - Button */}
									<CardFooter className="p-4 justify-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:-translate-y-5 transition-all duration-500">
										<Button
											onClick={() => {
												window.location.href = `/products/Horse/products/67c2a089630af4d30c1f845f`;
											}}
											className="text-yellow-600 bg-transparent border-2 border-yellow-600 hover:bg-yellow-600 hover:text-black rounded-md"
										>
											View More
										</Button>
									</CardFooter>
								</Card>
							</CarouselItem>
							<CarouselItem className="flex justify-center w-full h-[400px] md:basis-1/2 lg:basis-1/3 ">
								<Card className="group relative  m-2 w-[70%]  overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
									{/* Image Section */}
									<div className="w-full h-[60%] md:h-[70%] flex items-center justify-center overflow-hidden">
										<img
											src="I.S.- T.B. 102.jpg"
											alt="title"
											className="w-full h-full object-contain"
										/>
									</div>

									{/* Card Content */}
									<CardHeader className="p-4 flex-1 flex flex-col justify-between">
										<CardTitle className="text-base md:text-lg font-bold truncate">
											Sleeping Bag
										</CardTitle>
										<CardDescription className="text-sm text-black line-clamp-2">
											Description here...
										</CardDescription>
									</CardHeader>

									{/* Card Footer - Button */}
									<CardFooter className="p-4 justify-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:-translate-y-5 transition-all duration-500">
										<Button
											onClick={() => {
												window.location.href = `/products/Rider/products/67c6f5961af9c792d2ad2508`;
											}}
											className="text-yellow-600 bg-transparent border-2 border-yellow-600 hover:bg-yellow-600 hover:text-white rounded-md"
										>
											View More
										</Button>
									</CardFooter>
								</Card>
							</CarouselItem>
							<CarouselItem className="flex justify-center w-full h-[400px] md:basis-1/2 lg:basis-1/3 ">
								<Card className="group relative  m-2 w-[70%] overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
									{/* Image Section */}
									<div className="w-full h-[70%] md:h-[70%] flex items-center justify-center overflow-hidden">
										<img
											src="I.S.-F.V. 101.jpg"
											alt="title"
											className="w-full h-full object-contain"
										/>
									</div>

									{/* Card Content */}
									<CardHeader className="p-4 flex-1 flex flex-col justify-between">
										<CardTitle className="text-base md:text-lg font-bold truncate">
											Sleeping Bag
										</CardTitle>
										<CardDescription className="text-sm text-black line-clamp-2">
											Description here...
										</CardDescription>
									</CardHeader>

									{/* Card Footer - Button */}
									<CardFooter className="p-4 justify-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:-translate-y-5 transition-all duration-500">
										<Button
											onClick={() => {
												window.location.href = `/products/Horse/fly%20veil `;
											}}
											className="text-yellow-600 bg-transparent border-2 border-yellow-600 hover:bg-yellow-600 hover:text-black rounded-md"
										>
											View More
										</Button>
									</CardFooter>
								</Card>
							</CarouselItem>
						</CarouselContent>
						<CarouselPrevious className="absolute left-2 md:left-6 bg-gray-800 text-white hover:bg-gray-900 p-2 rounded-full shadow-lg" />
						<CarouselNext className="absolute right-2 md:right-6 bg-gray-800 text-white hover:bg-gray-900 p-2 rounded-full shadow-lg" />
					</Carousel>
				</div>
			</div>

			<div className=" flex flex-wrap mt-3 w-full text-center items-center justify-center">
				<div
					style={{ backgroundImage: "url('/main_horse.jpg')" }}
					className="bg-cover w-[100%] sm:w-[50%] bg-center h-[800px]  text-white flex flex-col items-center justify-center"
				>
					<h1 className="text-2xl font-bold ">Trending</h1>
					<h1 className="text-5xl font-extrabold">All Products</h1>
					<p className=" xl font-light w-[70%] lg:w-[60%] ">
						Discover top-quality products designed to enhance the
						performance, comfort, and well-being of both horses and
						riders.
					</p>
					<Button
						className="bg-transparent border-2 w-[30%] border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
						onClick={() => [(window.location.href = "/products")]}
					>
						Discover Now
					</Button>
				</div>
				<div className="flex flex-col w-[100%] sm:w-[50%]">
					<div
						style={{ backgroundImage: "url('/horse2.jpg')" }}
						className="bg-cover bg-center h-[400px] w-full  text-white flex flex-col items-center justify-center"
					>
						<h1 className="text-2xl font-bold ">Trending</h1>
						<h1 className="text-5xl font-extrabold">Horses</h1>
						<p className=" xl font-light w-[70%] lg:w-[60%] ">
							Give your horse the best care and comfort with our
							top-quality gear and accessories. Whether for
							training, competition, or daily care, we have
							everything your horse needs.
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
						<h1 className="text-2xl font-bold ">Trending</h1>
						<h1 className="text-5xl font-extrabold">Riders</h1>
						<p className=" xl font-light w-[70%] lg:w-[60%] ">
							Ride with confidence and style using our premium
							selection of equestrian gear tailored for riders of
							all levels.
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

			<Footer />
		</div>
	);
};
export default Hero;
