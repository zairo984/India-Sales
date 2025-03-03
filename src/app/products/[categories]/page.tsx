"use client";




import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CardCompo from "@/components/CardCompo";


interface SubCategory {
	id: string;
	name: string;
	category: string;
	description: string;
	imageUrl: string;
}

const Categories = () => {
	const { categories } = useParams();
	const category = categories as string;
	const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

	const fetchDropDownData = async () => {
		try {
			const res = await axios.get(`/api/categories/`);

			// Filter the data correctly
			const filteredData = res.data.subCategories?.filter(
				(item:SubCategory) => item.category.toLowerCase() === category
			);
			// console.log("filteredData: ", filteredData);

			// Set filtered data to state
			setSubCategories(filteredData);
			// console.log("subCategories: ", subCategories);
		} catch (err: unknown) {
			console.error("Error in fetching drop-down data: ", err);
		}
	};

	useEffect(() => {
		fetchDropDownData();
	}, [category]);
	useEffect(() => {
		// console.log("Updated Subcategories:", subCategories);
	}, [subCategories]);

	return (
		<div>
			<div className="flex flex-wrap gap-6 justify-center p-6">
				{subCategories.map((item, index) => (
				<CardCompo

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
export default Categories;
