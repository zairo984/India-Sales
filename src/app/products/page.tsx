"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Card,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { Search, Filter, Loader2 } from "lucide-react";

interface Product {
	id: string;
	name: string;
	category: string;
	subCategory: string;
	description: string;
	price: number;
	quantity: number;
	imageUrl: string;
}

const WHATSAPP_NUMBER = "918009005768";

const ProductsPage = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const fetchProducts = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const res = await axios.get("/api/products");
			setProducts(res.data.products || []);
			setFilteredProducts(res.data.products || []);
		} catch (err) {
			console.error("Error fetching products:", err);
			setError("Failed to load products. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	// Filter products based on search and category
	useEffect(() => {
		let filtered = products;

		if (searchQuery) {
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
					p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		if (selectedCategory !== "all") {
			filtered = filtered.filter(
				(p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
			);
		}

		setFilteredProducts(filtered);
	}, [searchQuery, selectedCategory, products]);

	const categories = ["all", ...new Set(products.map((p) => p.category))];

	const handleEnquiry = useCallback((productName: string) => {
		const message = encodeURIComponent(
			`Hi, I am interested in "${productName}". Can you share more details?`
		);
		window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
	}, []);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
					<p className="text-gray-600">Loading products...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<p className="text-red-500 mb-4">{error}</p>
					<Button onClick={fetchProducts} className="bg-yellow-500 hover:bg-yellow-600">
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen ">
			{/* Header Section */}
			<div className="bg-black text-white py-12">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
					<p className="text-gray-300 text-center max-w-2xl mx-auto">
						Discover our premium collection of equestrian products for horses and riders
					</p>
				</div>
			</div>

			{/* Search and Filter Section */}
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-md">
					{/* Search */}
					<div className="relative w-full md:w-96">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
						<input
							type="text"
							placeholder="Search products..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
							aria-label="Search products"
						/>
					</div>

					{/* Category Filter */}
					<div className="flex items-center gap-2">
						<Filter size={20} className="text-gray-400" />
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 capitalize"
							aria-label="Filter by category"
						>
							{categories.map((cat) => (
								<option key={cat} value={cat} className="capitalize">
									{cat === "all" ? "All Categories" : cat}
								</option>
							))}
						</select>
					</div>

					{/* Results count */}
					<p className="text-gray-600">
						{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
					</p>
				</div>
			</div>

			{/* Products Grid */}
			<div className="container mx-auto px-4 pb-12">
				{filteredProducts.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">No products found matching your criteria.</p>
						<Button
							onClick={() => {
								setSearchQuery("");
								setSelectedCategory("all");
							}}
							className="mt-4 bg-yellow-500 hover:bg-yellow-600"
						>
							Clear Filters
						</Button>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredProducts.map((item) => (
							<Card
								key={item.id}
								className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
							>
								{/* Image Section */}
								<div className="relative w-full h-[220px] overflow-hidden bg-white">
									<Image
										src={item.imageUrl || "/placeholder-product.jpg"}
										alt={item.name}
										fill
										className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									/>
									<div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
										{item.category}
									</div>
								</div>

								{/* Card Content */}
								<CardHeader className="p-4 pb-2">
									<CardTitle className="text-lg text-center font-semibold text-gray-800 line-clamp-2 min-h-[56px]">
										{item.name}
									</CardTitle>
									<p className="text-sm text-gray-500 text-center">{item.subCategory}</p>
								</CardHeader>

								{/* Card Footer */}
								<CardFooter className="p-4 pt-2 flex flex-col sm:flex-row gap-2">
									<Button
										asChild
										className="flex-1 bg-gray-900 hover:bg-yellow-500 text-white hover:text-black transition-colors"
									>
										<Link href={`/products/${item.category}/${item.subCategory}/${item.id}`}>
											View Details
										</Link>
									</Button>
									<Button
										onClick={() => handleEnquiry(item.name)}
										className="flex-1 bg-green-500 hover:bg-green-600 text-white gap-2"
										aria-label={`Enquire about ${item.name} on WhatsApp`}
									>
										Enquire <FaWhatsapp />
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductsPage;
