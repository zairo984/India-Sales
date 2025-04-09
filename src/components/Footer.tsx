"use client";

// import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link"

const Footer = () => {
	return (
		<footer className="bg-black  text-white py-2 flex flex-col items-center">
			{/* <div className="border-b border-gray-700 mb-4 flex justify-between items-center w-[95%]  text-gray-500 text-sm">
			<div className="" onClick={()=>{window.location.href="/"}}>
					<img
						src="/images/logo.jpg"
						alt="Logo"
						className="h-20 w-30 m-2"
					/>
			</div>
			<div className="space-y-2 flex justify-end pr-9">
					<h5 className="text-base font-semibold mx-3">Be a Part of our Community</h5>
					<div className="flex  space-x-6">
						<Link
							href="https://facebook.com"
							target="_blank"
							aria-label="Facebook"
						>
							<Facebook className="w-4 h-4 hover:text-blue-500 transition-all" />
						</Link>
						<Link
							href="https://instagram.com"
							target="_blank"
							aria-label="Instagram"
						>
							<Instagram className="w-4 h-4 hover:text-pink-500 transition-all" />
						</Link>
						<Link
							href="https://twitter.com"
							target="_blank"
							aria-label="Twitter"
						>
							<Twitter className="w-4 h-4 hover:text-blue-400 transition-all" />
						</Link>
					</div>
				</div>
			</div> */}
			
			<div className="container border-t border-gray-700 pt-4 mx-auto flex flex-col md:flex-row justify-between ">
				
			<div className="space-y-2 w-[40%]">
			<div className="" onClick={()=>{window.location.href="/"}}>
					<img
						src="/images/logo.jpg"
						alt="Logo"
						className="h-20 w-30 "
					/>
			</div>
					<p className="text-sm pl-2 text-gray-400 leading-relaxed">
					India Sales, the company known for its value addition, is operating in the Manchester of the East since 1989. A dedicated group from Kanpur, India, with a simple goal of offering the best assortment of Equestrian products, we believe in integrating advance technology to manufacture finest quality of our products....
						<Link
							href="/aboutus"
							className="text-blue-400 hover:text-white transition-all underline ml-1"
						>
							Read More
						</Link>
					</p>
				</div>
				
				

				{/* Quick Links: Horse */}
				{/* <div className="space-y-2 px-4">
					<h3 className="text-xl font-semibold">Horse</h3>
					<ul className="space-y-4">
						<li>
							<Link
								href="/products/Horse/fly%20mask"
								className="hover:text-blue-400 transition-all"
							>
								Fly Mask
							</Link>
						</li>
						<li>
							<Link
								href="/products/Horse/fly%20veil"
								className="hover:text-blue-400 transition-all"
							>
								Fly Veil
							</Link>
						</li>
						<li>
							<Link
								href="/products/horse"
								className="hover:text-blue-400 transition-all"
							>
								More
							</Link>
						</li>
					</ul>
				</div> */}

				{/* Quick Links: Rider */}
				{/* <div className="space-y-2">
					<h3 className="text-xl font-semibold">Rider</h3>
					<ul className="space-y-4">
						<li>
							<Link
								href="/products/Rider/breeches"
								className="hover:text-blue-400 transition-all"
							>
								Breeches
							</Link>
						</li>
						<li>
							<Link
								href="/products/Rider/riding%20tight"
								className="hover:text-blue-400 transition-all"
							>
								Riding Tights
							</Link>
						</li>
						<li>
							<Link
								href="/products/rider"
								className="hover:text-blue-400 transition-all"
							>
								More
							</Link>
						</li>
					</ul>
				</div> */}

				<div className="space-y-2">
					<h3 className="text-xl font-semibold">Quick Links</h3>
					<ul className="space-y-3">
					<li>
							<Link
								href="/"
								className="hover:text-blue-400 transition-all"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/aboutus"
								className="hover:text-blue-400 transition-all"
							>
								About Us
							</Link>
						</li>
						<li>
							<Link
								href="/contactus"
								className="hover:text-blue-400 transition-all"
							>
								Contact Us
							</Link>
						</li>
						<li>
							<Link
								href="/"
								className="hover:text-blue-400 transition-all"
							>
								Certificates
							</Link>
						</li>
					</ul>
				</div>
				{/* Social Media Links */}
				{/* Contact Information */}
				<div className="space-y-2 w-56">
					<h3 className="text-2xl font-semibold text-white">
						Contact Us
					</h3>
					<div className="flex items-center space-x-4 text-gray-400 text-sm">
						<span>📧</span>
						<a
							href="mailto:faraz@indiasales.co"
							className="hover:underline hover:text-blue-400 transition-all"
						>
							faraz@indiasales.co
						</a>
					</div>
					<div className="flex items-center space-x-4 text-gray-400 text-sm">
						<span>📞</span>
						<a
							href="tel:+918009005768"
							className="hover:underline hover:text-green-400 transition-all"
						>
							+91 8009005768
						</a>
						
					</div>
					<div className="flex items-center space-x-4 text-gray-400 text-sm"><span>📞</span>
						<a
							href="tel:+918009494503"
							className=" hover:underline hover:text-green-400 ransition-all" >
							+91 8009494503
						</a></div>
					<div className="flex items-start space-x-4 text-gray-400 text-sm">
						<span>🏢</span>
						<p>
							<strong>Head Office:</strong> 40/120 Hospital Road,
							Parade, Kanpur - INDIA - 208001
						</p>
					</div>
					
				</div>

				
				
			</div>

			{/* Bottom Bar */}
			<div className="border-t w-[95%] border-gray-700 mt-5 pt-6 text-center text-gray-500 text-sm">
				© {new Date().getFullYear()} IndiaSales. All Rights Reserved.
			</div>
		</footer>
	);
};

export default Footer;
