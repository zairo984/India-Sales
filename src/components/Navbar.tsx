"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight, Search, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface Category {
	name: string;
}

interface SubCategory {
	name: string;
	category: string;
}

const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const [categories, setCategories] = useState<string[]>([]);
	const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

	const fetchDropDownData = async () => {
		try {
			const response = await axios.get("/api/DropDownData");
			setCategories(response?.data.categories || []);
			setSubCategories(response?.data.subCategories || []);
		} catch (err) {
			console.error("Error fetching drop-down data:", err);
		}
	};

	useEffect(() => {
		fetchDropDownData();
	}, []);

	const pathname = usePathname();

	// Hide Navbar on admin routes
	if (pathname.startsWith("/admin")) {
		return null;
	}

	return (
		<nav className="w-full bg-white shadow-md">
			<div className="container mx-auto flex items-center justify-between p-4">
				{/* Logo */}
				<div>
					<img
						src="/images/logo.jpg"
						alt="Logo"
						className="h-10 w-28"
					/>
				</div>

				{/* Desktop Menu */}
				<div className="hidden md:flex gap-x-6">
					{["Home", "Categories", "AboutUs", "ContactUs"].map((navItem, index) => (
						<div key={index} className="relative group">
							<Link
								href={navItem === "Home" ? "/" : navItem === "Categories" ? "#" : `/${navItem?.toLowerCase()}`}
								onClick={(e) => {
									if (navItem === "Categories") {
										e.preventDefault(); // Prevents navigation
										setIsDropdownOpen(!isDropdownOpen);
									}
								}}
								className="cursor-pointer flex items-center gap-x-1 hover:text-primary_color"
							>
								{navItem}
								{navItem === "Categories" && <ChevronDown size={16} />}
							</Link>

							{/* Dropdown */}
							{navItem === "Categories" && isDropdownOpen && (
								<div ref={dropdownRef} className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg border p-2 z-20">
									{categories?.map((category, index) => (
										<div key={index} className="relative group">
											<Link
												href={`/products/${category.toLowerCase()}`}
												// Prevent navigation
												className="flex justify-between items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
												onMouseEnter={() => setActiveCategory(category)}
												
											>
												{category}
												{subCategories.some((sub) => sub.category === category) && <ChevronRight size={14} />}
											</Link>

											{activeCategory === category && (
												<div className="absolute left-full top-0 w-48 bg-white shadow-lg rounded-lg border p-2 ">
													{subCategories
														.filter((sub) => sub.category === category)
														.map((subCategory) => (
															<Link
																key={subCategory.name}
																href={`/products/${category}/${subCategory?.name.toLowerCase()}`}
																className="block px-4 py-2 hover:bg-gray-200"
																
															>
																{subCategory.name}
															</Link>
														))}
												</div>
											)}
										</div>
									))}
								</div>
							)}
						</div>
					))}

				</div>

				{/* Search Button */}
				<div>
					<Search className="cursor-pointer" />
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					className="md:hidden bg-white p-4 shadow-lg absolute top-16 left-0 w-full z-30 rounded-lg"
				>
					{["Home", "Categories", "AboutUs", "ContactUs"].map((navItem, index) => (
						<div key={index} className="py-3 border-b last:border-none">
							{navItem === "Categories" ? (
								// Categories should only open subcategories, not navigate
								<div>
									<button
										onClick={() => setIsDropdownOpen(!isDropdownOpen)}
										className="w-full text-left flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
									>
										<span>{navItem}</span>
										<ChevronDown size={16} />
									</button>

									{isDropdownOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											className="ml-6 mt-2"
										>
											{categories.map((cat) => (
												<div className="py-2 border-b last:border-none" key={cat}>
													<Link
														href={`/products/${cat?.toLowerCase()}`}
														onClick={() => setIsMobileMenuOpen(false)}
														className="text-gray-600 hover:text-blue-500"
													>
														{cat}
													</Link>
												</div>
											))}
										</motion.div>
									)}
								</div>
							) : (
								<Link
									href={navItem === "Home" ? "/" : `/${navItem?.toLowerCase().replace(/\s+/g, "-")}`}
									onClick={() => setIsMobileMenuOpen(false)}
									className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
								>
									{navItem}
								</Link>
							)}
						</div>
					))}
				</motion.div>
			)}

		</nav>
	);
};

export default Navbar;
