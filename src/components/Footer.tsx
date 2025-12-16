"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const QUICK_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "About Us", href: "/aboutus" },
	{ label: "Contact Us", href: "/contactus" },
	{ label: "Products", href: "/products" },
];

const CONTACT_INFO = {
	email: "faraz@indiasales.co",
	phones: ["+91 8009005768", "+91 8009494503"],
	address: "40/120 Hospital Road, Parade, Kanpur - INDIA - 208001",
};

const Footer = () => {
	return (
		<footer className="bg-black text-white border-t border-gray-800" role="contentinfo">
			<div className="container mx-auto px-4 py-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="lg:col-span-2 space-y-4">
						<Link href="/" className="inline-block" aria-label="India Sales Home">
							<Image
								src="/images/logo.jpg"
								alt="India Sales Logo"
								width={120}
								height={80}
								className="h-16 w-auto"
							/>
						</Link>
						<p className="text-gray-400 leading-relaxed max-w-md">
							India Sales, the company known for its value addition, is operating in the Manchester of the East since 1989. A dedicated group from Kanpur, India, with a simple goal of offering the best assortment of Equestrian products.
						</p>
						<Link
							href="/aboutus"
							className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
						>
							Read More →
						</Link>

						{/* Social Links */}
						{/* <div className="pt-4">
							<h3 className="text-sm font-semibold text-gray-300 mb-3">Follow Us</h3>
							<div className="flex gap-4">
								{SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
									<a
										key={label}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300"
									>
										<Icon size={18} />
									</a>
								))}
							</div>
						</div> */}
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
						<nav aria-label="Footer navigation">
							<ul className="space-y-3">
								{QUICK_LINKS.map(({ label, href }) => (
									<li key={label}>
										<Link
											href={href}
											className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2"
										>
											<span className="text-yellow-400">›</span>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>

					{/* Contact Information */}
					<div>
						<h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
						<address className="not-italic space-y-4">
							<a
								href={`mailto:${CONTACT_INFO.email}`}
								className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors group"
							>
								<Mail size={18} className="text-yellow-400 group-hover:scale-110 transition-transform" />
								{CONTACT_INFO.email}
							</a>
							{CONTACT_INFO.phones.map((phone) => (
								<a
									key={phone}
									href={`tel:${phone.replace(/\s/g, "")}`}
									className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group"
								>
									<Phone size={18} className="text-green-400 group-hover:scale-110 transition-transform" />
									{phone}
								</a>
							))}
							<div className="flex items-start gap-3 text-gray-400">
								<MapPin size={18} className="text-blue-400 flex-shrink-0 mt-1" />
								<span>{CONTACT_INFO.address}</span>
							</div>
						</address>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-800">
				<div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="text-gray-500 text-sm">
						© {new Date().getFullYear()} India Sales. All Rights Reserved.
					</p>
					<p className="text-gray-600 text-xs">
						Manufacturing Quality Equestrian Products Since 1989
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
