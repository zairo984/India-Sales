import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Product from "@/models/products";
import SubCategory from "@/models/subCategories";

connectDB();

export async function GET() {
	try {
		const product = await Product.find();

		// console.log("product: ", product);
		// console.log("subCategories: ", subCategories);
		const productArray = product.map((subCategory) => ({
			id: subCategory.id,
			name: subCategory.name,
			category: subCategory.category,
			subCategory: subCategory.subCategory,
			description: subCategory.description,
			price: subCategory.price,
			quantity: subCategory.quantity,
			imageUrl: subCategory.imageUrl,
		}));

		return NextResponse.json({ products: productArray }, { status: 200 });
	} catch (err: unknown) {
		const error = new Error((err as Error).toString());
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		if (await SubCategory.findOne({ name: body.name })) {
			return NextResponse.json(
				{ message: "Category already exists" },
				{ status: 400 }
			);
		} else {
			const category = await SubCategory.create(body);
			// console.log(category);
			return NextResponse.json({ message: "success" }, { status: 200 });
		}
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const body = await req.json();
		const id = body.id;
		const subCategory = await SubCategory.findByIdAndDelete(id);
		await Product.deleteMany({ subcategory: subCategory?.name });
		return NextResponse.json(
			{ message: "Subcategory and Related Products Deleted" },
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ error: err, message: "error deleting products" },
			{ status: 500 }
		);
	}
}
