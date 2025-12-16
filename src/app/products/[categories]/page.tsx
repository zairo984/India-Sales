"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import CardCompo from "@/components/CardCompo";
import { Loader2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SubCategory {
	id: string;
	name: string;
	category: string;
	description: string;
	imageUrl: string;
}

const Categories = () => {
	const { categories } = useParams();
	const category = decodeURIComponent(categories as string);
	const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchDropDownData = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const res = await axios.get(`/api/categories/`);

			const filteredData = res.data.subCategories?.filter(
				(item: SubCategory) =>
					item.category.toLowerCase() === category.toLowerCase()
			) || [];

			setSubCategories(filteredData);
		} catch (err) {
			console.error("Error fetching subcategories:", err);
			setError("Failed to load subcategories. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}, [category]);

	useEffect(() => {
		if (category) {
			fetchDropDownData();
		}
	}, [category, fetchDropDownData]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center ">
				<div className="text-center">
					<Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
					<p className="text-gray-600">Loading {category} products...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center ">
				<div className="text-center">
					<p className="text-red-500 mb-4">{error}</p>
					<Button onClick={fetchDropDownData} className="bg-yellow-500 hover:bg-yellow-600">
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen ">
			{/* Header */}
			<div className="bg-gradient-to-r from-gray-900 to-black text-white ">
				<div className="container mx-auto px-4">
					<nav className="text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
						<ol className="flex items-center gap-2">
							<li>
								<Link href="/" className="hover:text-white">Home</Link>
							</li>
							<li>/</li>
							<li>
								<Link href="/products" className="hover:text-white">Products</Link>
							</li>
							<li>/</li>
							<li className="text-yellow-400 capitalize">{category}</li>
						</ol>
					</nav>
					<h1 className="text-4xl font-bold capitalize">{category}</h1>
					<p className="text-gray-300 mt-2">
						{subCategories.length} subcategories available
					</p>
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 py-12">
				{subCategories.length === 0 ? (
					<div className="text-center py-12">
						<FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
						<p className="text-gray-500 text-lg">No subcategories found for {category}.</p>
						<Button asChild className="mt-4 bg-yellow-500 hover:bg-yellow-600">
							<Link href="/products">Browse All Products</Link>
						</Button>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{subCategories.map((item) => (
							<CardCompo
								key={item.id}
								title={item.name}
								description={item.description}
								imageUrl={item.imageUrl}
								id={item.id}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Categories;
