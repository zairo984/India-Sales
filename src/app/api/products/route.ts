import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/products";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

interface LeanProduct {
	_id: string;
	name: string;
	category?: string;
	subCategory?: string;
	description?: string;
	price?: number;
	quantity?: number;
	imageUrl?: string;
}

export async function GET() {
	try {
		await connectDB();
		
		const products = await Product.find().sort({ createdAt: -1 }).lean<LeanProduct[]>();

		const productArray = products.map((product) => ({
			id: product._id.toString(),
			name: product.name,
			category: product.category || "",
			subCategory: product.subCategory || "",
			description: product.description || "",
			price: product.price || 0,
			quantity: product.quantity || 0,
			imageUrl: product.imageUrl || "",
		}));

		return NextResponse.json(
			{ products: productArray },
			{ 
				status: 200,
				headers: {
					"Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
				},
			}
		);
	} catch (err) {
		console.error("Error fetching products:", err);
		return NextResponse.json(
			{ error: "Failed to fetch products" },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectDB();
		
		const body = await req.json();

		// Validate required fields
		if (!body.name || !body.name.trim()) {
			return NextResponse.json(
				{ message: "Product name is required" },
				{ status: 400 }
			);
		}

		// Check for duplicate
		const existingProduct = await Product.findOne({ 
			name: { $regex: new RegExp(`^${body.name}$`, "i") } 
		});
		
		if (existingProduct) {
			return NextResponse.json(
				{ message: "A product with this name already exists" },
				{ status: 400 }
			);
		}

		const product = await Product.create({
			name: body.name.trim(),
			description: body.description?.trim() || "",
			imageUrl: body.imageUrl || "",
			price: body.price || 0,
			quantity: body.quantity || 0,
			category: body.category || "",
			subCategory: body.subCategory || "",
		});

		return NextResponse.json(
			{ message: "Product created successfully", productId: product._id },
			{ status: 201 }
		);
	} catch (err) {
		console.error("Error creating product:", err);
		return NextResponse.json(
			{ error: "Failed to create product" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: NextRequest) {
	try {
		await connectDB();
		
		const body = await req.json();
		
		if (!body.id) {
			return NextResponse.json(
				{ message: "Product ID is required" },
				{ status: 400 }
			);
		}

		const deletedProduct = await Product.findByIdAndDelete(body.id);
		
		if (!deletedProduct) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Product deleted successfully" },
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error deleting product:", err);
		return NextResponse.json(
			{ error: "Failed to delete product" },
			{ status: 500 }
		);
	}
}
