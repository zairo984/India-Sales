import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Category from "@/models/categories";
import SubCategory from "@/models/subCategories";
import Product from "@/models/products";

connectDB();

export async function GET() {
	try {
		const categories = await Category.find();
		const categoriesArray = categories.map((category) => ({
			id: category.id,
			name: category.name,
			description: category.description,
			imageUrl: category.imageUrl,
		}));

		const subCategories = await SubCategory.find();
		// console.log("subCategories: ", subCategories);
		const subCategoriesArray = subCategories.map((subCategory) => ({
			id: subCategory.id,
			name: subCategory.name,
			category: subCategory.category,
			description: subCategory.description,
			imageUrl: subCategory.imageUrl,
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

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		if (await Category.findOne({ name: body.name })) {
			return NextResponse.json(
				{ message: "Category already exists" },
				{ status: 400 }
			);
		} else {
			const category = await Category.create(body);
			// console.log(category);
			return NextResponse.json({ message: "success" }, { status: 200 });
		}
		// console.log(category)
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const body = await req.json();
		const id = body.id;

		// Delete the category first
		const category = await Category.findByIdAndDelete(id);

		// If category not found, return 404
		if (!category) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			);
		}

		// Delete related subcategories and products
		await SubCategory.deleteMany({ category: category.name });
		await Product.deleteMany({ category: category.name });

		return NextResponse.json(
			{ message: "Category and related products deleted successfully" },
			{ status: 200 }
		);
	} catch (err: unknown) {
		const error = new Error((err as Error).toString());
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PUT(req: Request) {
	try {
		await connectDB(); // Ensure DB connection

		const { id, name, description, imageUrl } = await req.json();

		if (!id || !name || !description) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		const category = await Category.findById(id);
		if (!category) {
			return NextResponse.json(
				{ message: "Category not found" },
				{ status: 404 }
			);
		}

		category.name = name;
		category.description = description;
		if (imageUrl) category.imageUrl = imageUrl; // Update only if provided

		await category.save();

		return NextResponse.json(
			{ message: "Category updated successfully", category },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating category:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
