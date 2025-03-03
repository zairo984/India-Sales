"use client";

import Recommendation from "@/components/Recommendation";
import axios from "axios";
import { useEffect, useState } from "react";
import { AdminCard } from "@/components/CardCompoAdmin";

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

const ProductsPage = () => {
	const [products, setProducts] = useState<Product[]>([]);

	const fetchProducts = async () => {
		try {
			const res = await axios.get("/api/products");
			setProducts(res.data.products);
			console.log("Fetched products:", res.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<Recommendation />
			<div className="flex flex-wrap gap-6 justify-center p-6">
				{products.map((item) => (
					<AdminCard
						key={item.id}
						title={item.name}
						description={item.description}
						imageUrl={item.imageUrl}
						id={item.id}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductsPage;
