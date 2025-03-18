"use client";

import { Facebook, Instagram, Twitter} from "lucide-react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-gray-900  text-white py-5">
	<div className="container grid grid-cols-1 md:grid-cols-5 gap-12 mx-auto px-8 lg:px-24">
		{/* Logo & Description */}
		<div className="space-y-2">
			<h2 className="text-3xl font-bold">IndiaSales</h2>
			<p className="text-sm text-gray-400 leading-relaxed">
				India Sales, the company known for its value addition, is operating in the Manchester of the East since 1989...
				<Link href="/aboutus" className="text-blue-400 hover:text-white transition-all underline ml-1">
					Read More
				</Link>
			</p>
		</div>

		{/* Quick Links: Horse */}
		<div className="space-y-2">
			<h3 className="text-xl font-semibold">Horse</h3>
			<ul className="space-y-4">
				<li><Link href="/products/Horse/fly%20mask" className="hover:text-blue-400 transition-all">Fly Mask</Link></li>
				<li><Link href="/products/Horse/fly%20veil" className="hover:text-blue-400 transition-all">Fly Veil</Link></li>
				<li><Link href="/products/horse" className="hover:text-blue-400 transition-all">More</Link></li>
			</ul>
		</div>

		{/* Quick Links: Rider */}
		<div className="space-y-2">
			<h3 className="text-xl font-semibold">Rider</h3>
			<ul className="space-y-4">
				<li><Link href="/products/Rider/breeches" className="hover:text-blue-400 transition-all">Breeches</Link></li>
				<li><Link href="/products/Rider/riding%20tight" className="hover:text-blue-400 transition-all">Riding Tights</Link></li>
				<li><Link href="/products/rider" className="hover:text-blue-400 transition-all">More</Link></li>
			</ul>
		</div>

		{/* Social Media Links */}
		<div className="space-y-2">
			<h3 className="text-xl font-semibold">Follow Us</h3>
			<div className="flex flex-col space-y-6">
				<Link href="https://facebook.com" target="_blank" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-blue-500 transition-all" /></Link>
				<Link href="https://instagram.com" target="_blank" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-pink-500 transition-all" /></Link>
				<Link href="https://twitter.com" target="_blank" aria-label="Twitter"><Twitter className="w-6 h-6 hover:text-blue-400 transition-all" /></Link>
			</div>
		</div>

		{/* Contact Information */}
		<div className="space-y-2">
			<h3 className="text-2xl font-semibold text-white">Contact Us</h3>
			<div className="flex items-center space-x-4 text-gray-400 text-sm">
				<span>📧</span>
				<a href="mailto:faraz@indiasales.co" className="hover:underline hover:text-blue-400 transition-all">faraz@indiasales.co</a>
			</div>
			<div className="flex items-center space-x-4 text-gray-400 text-sm">
				<span>📞</span>
				<a href="tel:+918009005768" className="hover:underline hover:text-green-400 transition-all">+91 8009005768</a>
			</div>
			<div className="flex items-start space-x-4 text-gray-400 text-sm">
				<span>🏢</span>
				<p><strong>Head Office:</strong> 40/120 Hospital Road, Parade, Kanpur - INDIA - 208001</p>
			</div>
			<div className="flex items-start space-x-4 text-gray-400 text-sm">
				<span>🏭</span>
				<p><strong>Work Address:</strong> 18/1 A-1 Pokharpur Jajmau, Kanpur - INDIA - 208010</p>
			</div>
		</div>
	</div>

	{/* Bottom Bar */}
	<div className="border-t border-gray-700 mt-5 pt-6 text-center text-gray-500 text-sm">
		© {new Date().getFullYear()} IndiaSales. All Rights Reserved.
	</div>
</footer>

	);
};

export default Footer;
