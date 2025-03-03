"use client";


import Recommendation from "@/components/Recommendation";

import axios from "axios";
import { useEffect, useState } from "react";

import { AdminCard } from "@/components/CardCompoAdmin";


interface Products {
	id: string;
	name: string;
	category: string;
	subCategory: string;
	description: string;
	price: number;
	quantity: number;
	imageUrl: string;
}

const Product = () => {
	
	const [products, setproducts] = useState<Products[]>([]);

	const fetchDropDownData = async () => {
		try {
			const res = await axios.get(`/api/products/`);

			setproducts(res.data.products);
			console.log("subCategories: ", products);
		} catch (err: unknown) {
			console.error("Error in fetching drop-down data: ", err);
		}
	};

	useEffect(() => {
		fetchDropDownData();
	}, []);


	return (
		<div>
			<Recommendation />
			<div className="flex flex-wrap gap-6 justify-center p-6">
				{products.map((item, index) => (
				<AdminCard

						key={index}
						title={item.name}
						description={item.description}
						imageUrl={item.imageUrl}
						id = {item.id}
					/>
				))}
			</div>

		</div>
	);
};
export default Product;
