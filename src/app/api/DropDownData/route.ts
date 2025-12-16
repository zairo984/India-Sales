import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Category from "@/models/categories";
import SubCategory from "@/models/subCategories";

export async function GET() {
	try {
		await connectDB();
		
		const categories = await Category.find();
		const categoriesArray = categories.map((category) => category.name);

		const subCategories = await SubCategory.find();
		const subCategoriesArray = subCategories.map((subCategory) => ({
			name: subCategory.name,
			category: subCategory.category,
		}));

		return NextResponse.json(
			{ categories: categoriesArray, subCategories: subCategoriesArray },
			{ 
				status: 200,
				headers: {
					'Cache-Control': 'no-store, max-age=0',
				}
			}
		);
	} catch (err: unknown) {
		console.error("DropDownData API error:", err);
		const error = new Error((err as Error).toString());
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
