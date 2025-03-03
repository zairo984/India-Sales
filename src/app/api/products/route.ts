import { NextRequest, NextResponse } from "next/server";

import Product from "@/models/products";


export async function GET(req: NextRequest) {
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
	} catch (err: any) {
		const error = new Error(err);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		console.log(body);
		if (await Product.findOne({ name: body.name })) {
			return NextResponse.json(
				{ message: "Category already exists" },
				{ status: 400 }
			);
		}
		const category = await Product.create(body);
		console.log(category);
		return NextResponse.json({ message: "success" }, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
export async function DELETE(req: NextRequest) {
	try {
		console.log(req);
		const body = await req.json();
		const id = body.id;
		const product = await Product.findByIdAndDelete(id);
		console.log(product)
		return NextResponse.json({ message: "success" }, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
