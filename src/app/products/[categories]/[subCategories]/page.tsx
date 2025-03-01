"use client";


import Recommendation from "@/components/Recommendation";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
	const { subCategories } = useParams();
	const subCategory = decodeURIComponent(subCategories as string);
	console.log(subCategory)
	const [products, setproducts] = useState<Products[]>([]);

	const fetchDropDownData = async () => {
		try {
			const res = await axios.get(`/api/subcategory/`);
	
			// Debugging the response
			console.log("API Response:", res.data);
	
			if (!res.data.products) {
				console.error("Error: products key not found in API response");
				return;
			}
	
			// Ensure subCategory is valid
			if (!subCategory || typeof subCategory !== "string") {
				console.error("Error: subCategory is undefined or not a string");
				return;
			}
	
			// Filter the data safely
			const filteredData = res.data.products.filter(
				(item: Products) => item?.subCategory?.toLowerCase() === subCategory.toLowerCase()
			);
	
			console.log("filteredData: ", filteredData);
	
			// Set filtered data to state
			setproducts(filteredData);
			console.log("Updated products state: ", filteredData);
		} catch (err: any) {
			console.error("Error in fetching drop-down data: ", err);
		}
	};
	

	useEffect(() => {
		fetchDropDownData();
	}, [subCategory]);


	return (
		<div>
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

			<Recommendation />
		</div>
	);
};
export default Product;
