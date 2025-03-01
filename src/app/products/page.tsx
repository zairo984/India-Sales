"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Recommendation from "@/components/Recommendation";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminCard } from "@/components/CardCompoAdmin";
import CardCompo from "@/components/CardCompo";
import { Link } from "lucide-react";
import Certificates from "@/components/certificate";

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
		} catch (err: any) {
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
