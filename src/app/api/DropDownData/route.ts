import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Category from "@/models/categories";
import SubCategory from "@/models/subCategories";

connectDB();

export async function GET() {
	try {
		console.log("aa rha hai andar ahhhh")
		const categories = await Category.find();
		const categoriesArray = categories.map((category) => category.name);

		const subCategories = await SubCategory.find();
		console.log("subCategories: ", subCategories);
		const subCategoriesArray = subCategories.map((subCategory) => ({
			name: subCategory.name,
			category: subCategory.category,
		}));

		return NextResponse.json(
			{ categories: categoriesArray, subCategories: subCategoriesArray },
			{ status: 200 }
		);
	} catch (err: unknown) {
		const error = new Error((err as Error).toString());
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
