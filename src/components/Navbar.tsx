"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SubCategory {
	name: string;
	category: string;
}

interface NavItem {
	label: string;
	href: string;
	hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Categories", href: "#", hasDropdown: true },
	{ label: "About Us", href: "/aboutus" },
	{ label: "Contact Us", href: "/contactus" },
];

const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [categories, setCategories] = useState<string[]>([]);
	const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const mobileMenuRef = useRef<HTMLDivElement | null>(null);
	const hasFetchedRef = useRef(false);
	const pathname = usePathname();

	// Fetch dropdown data - only once on initial mount
	const fetchDropDownData = useCallback(async () => {
		if (hasFetchedRef.current) return;
		hasFetchedRef.current = true;
		
		try {
			setIsLoading(true);
			const response = await axios.get("/api/DropDownData");
			setCategories(response?.data.categories || []);
			setSubCategories(response?.data.subCategories || []);
		} catch (err) {
			console.error("Error fetching drop-down data:", err);
			hasFetchedRef.current = false; // Allow retry on error
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchDropDownData();
	}, [fetchDropDownData]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
				setActiveCategory(null);
			}
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setIsMobileMenuOpen(false);
		setIsDropdownOpen(false);
	}, [pathname]);

	// Handle escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsDropdownOpen(false);
				setIsMobileMenuOpen(false);
				setActiveCategory(null);
			}
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, []);

	// Hide Navbar on admin routes
	if (pathname.startsWith("/admin")) {
		return null;
	}

	return (
		<nav className="w-full sticky top-0 bg-black/95 backdrop-blur-sm text-white z-50 shadow-lg" role="navigation" aria-label="Main navigation">
			<div className="container mx-auto px-4 py-2 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg" aria-label="India Sales Home">
					<Image
						src="/images/logo.jpg"
						alt="India Sales Logo"
						width={120}
						height={80}
						className="h-16 w-auto lg:h-20 lg:ml-12"
						priority
					/>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex items-center gap-x-8 lg:gap-x-10">
					{NAV_ITEMS.map((item) => (
						<div key={item.label} className="relative" ref={item.hasDropdown ? dropdownRef : undefined}>
							{item.hasDropdown ? (
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex items-center gap-x-1 hover:text-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1"
									aria-expanded={isDropdownOpen}
									aria-haspopup="true"
								>
									{item.label}
									<ChevronDown
										size={16}
										className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
									/>
								</button>
							) : (
								<Link
									href={item.href}
									className={`hover:text-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-2 py-1 ${
										pathname === item.href ? "text-yellow-400" : ""
									}`}
								>
									{item.label}
								</Link>
							)}

							{/* Dropdown */}
							<AnimatePresence>
								{item.hasDropdown && isDropdownOpen && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
										className="absolute left-0 mt-2 w-56 bg-black shadow-xl rounded-lg border border-gray-700 p-2 z-20"
										role="menu"
									>
										{isLoading ? (
											<div className="px-4 py-3 text-gray-400">Loading...</div>
										) : categories.length === 0 ? (
											<div className="px-4 py-3 text-gray-400">No categories</div>
										) : (
											categories.map((category) => (
												<div key={category} className="relative group">
													<Link
														href={`/products/${category.toLowerCase()}`}
														className="flex justify-between items-center px-4 py-2.5 hover:bg-gray-800 rounded-md cursor-pointer transition-colors"
														onMouseEnter={() => setActiveCategory(category)}
														role="menuitem"
													>
														<span>{category}</span>
														{subCategories.some((sub) => sub.category === category) && (
															<ChevronRight size={14} className="text-gray-400" />
														)}
													</Link>

													{/* Subcategories */}
													<AnimatePresence>
														{activeCategory === category && subCategories.some((sub) => sub.category === category) && (
															<motion.div
																initial={{ opacity: 0, x: -10 }}
																animate={{ opacity: 1, x: 0 }}
																exit={{ opacity: 0, x: -10 }}
																className="absolute left-full top-0 w-48 bg-black shadow-xl rounded-lg border border-gray-700 p-2 ml-1"
																role="menu"
															>
																{subCategories
																	.filter((sub) => sub.category === category)
																	.sort((a, b) => a.name.localeCompare(b.name))
																	.map((subCategory) => (
																		<Link
																			key={subCategory.name}
																			href={`/products/${category}/${subCategory.name.toLowerCase()}`}
																			className="block px-4 py-2 hover:bg-gray-800 rounded-md transition-colors"
																			role="menuitem"
																		>
																			{subCategory.name}
																		</Link>
																	))}
															</motion.div>
														)}
													</AnimatePresence>
												</div>
											))
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					))}
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					aria-expanded={isMobileMenuOpen}
					aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
				>
					{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						ref={mobileMenuRef}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden bg-gray-900 border-t border-gray-700"
						role="menu"
					>
						<div className="container mx-auto px-4 py-4 space-y-2">
							{NAV_ITEMS.map((item) => (
								<div key={item.label} className="border-b border-gray-800 last:border-none pb-2">
									{item.hasDropdown ? (
										<div>
											<button
												onClick={() => setIsDropdownOpen(!isDropdownOpen)}
												className="w-full text-left flex justify-between items-center px-4 py-3 text-white hover:bg-gray-800 rounded-lg transition-colors"
												aria-expanded={isDropdownOpen}
											>
												<span>{item.label}</span>
												<ChevronDown
													size={16}
													className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
												/>
											</button>

											<AnimatePresence>
												{isDropdownOpen && (
													<motion.div
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: "auto", opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														className="ml-4 mt-2 space-y-1 overflow-hidden"
													>
														{categories.map((cat) => (
															<Link
																key={cat}
																href={`/products/${cat.toLowerCase()}`}
																className="block px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-800 rounded transition-colors"
															>
																{cat}
															</Link>
														))}
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									) : (
										<Link
											href={item.href}
											className={`block px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors ${
												pathname === item.href ? "text-yellow-400" : "text-white"
											}`}
										>
											{item.label}
										</Link>
									)}
								</div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
