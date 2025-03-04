"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import Loader from "@/components/Loader";
import { FiPlus, FiTrash2, FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface SubCategory {
	name: string;
	category: string;
}

const Admin = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [formOpen, setFormOpen] = useState(false);
	const [subCategory, setSubCategory] = useState("");
	const [product, setProduct] = useState<
		| { name: string; description: string; imageUrl: string; id: string }[]
		| null
	>(null);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState("");
	const [price, setPrice] = useState("");
	const [uploadedImageUrl, setUploadedImageUrl] = useState("");
	const [category, setCategory] = useState("");
	const [formCategory, setFormCategory] = useState([]);
	const [formSubCategory, setFormSubCategory] = useState({});
	const [formSubCategoryList, setFormSubCategoryList] = useState<
		SubCategory[]
	>([]);
	const [loading, setLoading] = useState(true);

	async function getProduct() {
		try {
			const res = await axios.get(`/api/subcategory/`);
			setProduct(res.data.products);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	async function getCatAndSubCat() {
		try {
			const res = await axios.get(`/api/DropDownData/`);
			setFormCategory(res.data.categories);
			setFormSubCategory(res.data.subCategories);
		} catch (err) {
			console.error(err);
		}
	}

	async function deleteProduct(id: string) {
		try {
			const res = await axios.delete(`/api/products/`, { data: { id } });
			toast.success(res.data.message);
			getProduct();
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "An unknown error occurred";
			toast.error(errorMessage);
		}
	}

	useEffect(() => {
		getProduct();
		getCatAndSubCat();
	}, []);

	const subArray = Object.values(formSubCategory) as SubCategory[];

	useEffect(() => {
		if (category && Array.isArray(subArray)) {
		  const filteredSubCategories = subArray
			.filter((sub: SubCategory) => sub.category === category);
		  setFormSubCategoryList(filteredSubCategories);
		} else {
		  setFormSubCategoryList([]);
		}
	  }, [category]);

	async function createSubCategory() {
		try {
			const res = await axios.post(
				`/api/products/`,
				{
					name,
					description,
					imageUrl: uploadedImageUrl,
					price,
					quantity,
					category,
					subCategory,
				},
				{ headers: { "Content-Type": "application/json" } }
			);
			// console.log(
			// 	name,
			// 	description,
			// 	uploadedImageUrl,
			// 	price,
			// 	quantity,
			// 	category,
			// 	subCategory
			// );
			toast.success(res.data.message);
			setName("");
			setDescription("");
			setUploadedImageUrl("");
			setCategory("");
			setQuantity("");
			setPrice("");
			setFormOpen(false);
			getProduct();
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "An unknown error occurred";
			toast.error(errorMessage);
		}
	}

	return (
		<div className="flex min-h-screen bg-gray-100">
			<ToastContainer />
			<Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

			<div
				className={`transition-all duration-300 p-6 flex-1 ${
					isSidebarOpen
						? "ml-[250px] w-[calc(100%-250px)]"
						: "ml-2 w-full"
				}`}
			>
				<header className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center sticky top-0 z-10">
					<h1 className="text-xl lg:text-3xl  font-bold text-gray-700">
						Admin Dashboard
					</h1>
					<Button
						onClick={() => setFormOpen(true)}
						className="flex text-sm lg:text-xl items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
					>
						<FiPlus size={20} /> Add Product
					</Button>
				</header>

				{/* Product List */}
				<div className="flex flex-wrap gap-6 justify-center p-6">
					{loading ? (
						<div className="flex justify-center items-center h-96">
							<Loader type="dots" size={40} color="#3b82f6" />
						</div>
					) : product?.length ? (
						product.map((item, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.05 }}
								className="w-[300px] p-4"
							>
								<Card className="shadow-lg border h-[400px] border-gray-200 bg-white rounded-lg">
									{/* Image */}
									<div className="w-full h-[200px] bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
										<img
											src={
												item.imageUrl ||
												"https://via.placeholder.com/300"
											}
											alt={item.name}
											className="w-full h-full object-cover"
										/>
									</div>

									{/* Content */}
									<CardHeader className="p-4">
										<CardTitle className="text-lg font-semibold text-gray-800">
											{item.name}
										</CardTitle>
										<CardContent className="text-sm text-gray-600">
											{item.description}
										</CardContent>
									</CardHeader>

									{/* Footer Buttons */}
									<CardFooter className="p-4 flex justify-between">
										<Button
											className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md"
											onClick={() =>
												deleteProduct(item.id)
											}
										>
											<FiTrash2 />
										</Button>
										<Button
											className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md"
											onClick={() =>
												(window.location.href = `products/${item.id}`)
											}
										>
											<FiEye />
										</Button>
									</CardFooter>
								</Card>
							</motion.div>
						))
					) : (
						<p className="text-gray-500 text-center text-lg">
							No products available
						</p>
					)}
				</div>
			</div>
			{formOpen && (
				<div className="fixed inset-0 flex z-50 items-center justify-center overflow-y-auto bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-xl font-bold mb-4">
							Add New Category
						</h2>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								createSubCategory();
							}}
						>
							<input
								type="text"
								placeholder="Category Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full border p-2 rounded mb-3"
							/>
							<select
								name="category"
								id=""
								className="w-full border p-2 rounded mb-3"
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="">-- Select Category --</option>
								{formCategory.map((item, index) => (
									<option key={index} value={item}>
										{item}
									</option>
								))}
							</select>
							<select
								name="subCategory"
								id=""
								className="w-full border p-2 rounded mb-3"
								onChange={(e) => setSubCategory(e.target.value)}
							>
								<option value="">-- Select Category --</option>
								{formSubCategoryList?.map((item, index) => (
									<option key={index} value={item.name}>
										{item.name}
									</option>
								))}
							</select>
							<input
								type="text"
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="w-full border p-2 rounded mb-3"
							/>
							<input
								type="text"
								placeholder="quantity"
								value={quantity}
								onChange={(e) => {
									// console.log(e.target.value)
									setQuantity(e.target.value);
								}}
								className="w-full border p-2 rounded mb-3"
							/>
							<input
								type="text"
								placeholder="price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								className="w-full border p-2 rounded mb-3"
							/>
							<ImageUpload
								uploadedImageUrl={uploadedImageUrl}
								setUploadedImageUrl={setUploadedImageUrl}
							/>
							<div className="flex justify-end gap-3 mt-4">
								<Button
									type="button"
									onClick={() => setFormOpen(false)}
									className="bg-gray-400 hover:bg-gray-500"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-blue-600 hover:bg-blue-700"
								>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Admin;
