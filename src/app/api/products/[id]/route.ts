import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/products";
import { connectDB } from "@/lib/db"; // Ensure you import your database connection

export async function GET(req: NextRequest) {
	try {
		await connectDB(); // Ensure DB is connected

		const urlPath = req.nextUrl.pathname.split("/");

		const id = urlPath[urlPath.length - 1];
		// console.log("id in backend: ", id);
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ error: "Invalid product ID" },
				{ status: 400 }
			);
		}

		const product = await Product.findById(id);

		// console.log("product: ", product);

		if (!product) {
			return NextResponse.json(
				{ error: "Product not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(product, { status: 200 });
	} catch (error) {
		console.error("Error fetching product:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

// export async function DELETE(req: NextRequest) {
// 	try {
// 		const body = await req.json();
// 		const id = body.id;
// 		const product = await Product.findByIdAndDelete(id);
// 		// console.log(product)
// 		return NextResponse.json({ message: "success" }, { status: 200 });
// 	} catch (err) {
// 		console.log(err);
// 		return NextResponse.json({ error: err }, { status: 500 });
// 	}
// }

// export async function POST(req: NextRequest) {
// 	try{

// 		const body = await req.json();
// 		console.log(req)
// 		if(await Product.findOne({name:body.name})){
// 			return NextResponse.json({message:"Category already exists"},{status:400})
// 		}
// 		else{
// 			const category = await Product.create(body);
// 			console.log(category)
// 			return NextResponse.json({message:"success"},{status:200})
// 		}
// 		// console.log(subCategory)
		
// 	}catch(err){
// 		console.log(err)
// 		return NextResponse.json({error:err},{status:500})
// 	}
// }
