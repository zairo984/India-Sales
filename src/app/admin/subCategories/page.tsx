"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { FiPlus, FiTrash2, FiEye } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from "@/components/ImageUpload";
import Loader from "@/components/Loader";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Button } from "@/components/ui/button";

const Admin = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [formOpen, setFormOpen] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [uploadedImageUrl, setUploadedImageUrl] = useState("");
	const [category, setCategory] = useState<{ name: string }[]>([]);
	const [formCategory, setFormCategory] = useState("");
	const [subCategory, setSubCategory] = useState<
		| { name: string; description: string; imageUrl: string; id: string }[]
		| null
	>(null);
	const [loading, setLoading] = useState(true);

	async function getSubCategory() {
		try {
			const res = await axios.get(`/api/categories/`);
			setSubCategory(res.data.subCategories);
			setCategory(res.data.categories);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	async function deleteSubCategory(id: string) {
		try {
			const res = await axios.delete(`/api/subcategory/`, {
				data: { id },
			});
			getSubCategory();
			toast.success(res.data.message);
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "An unknown error occurred";
			toast.error(errorMessage);
		}
	}

	useEffect(() => {
		getSubCategory();
	}, []);

	async function createSubCategory() {
		try {
			const res = await axios.post(
				`/api/subcategory/`,
				{
					name,
					description,
					imageUrl: uploadedImageUrl,
					category: formCategory,
				},
				{ headers: { "Content-Type": "application/json" } }
			);
			toast.success(res.data.message);
			setName("");
			setDescription("");
			setUploadedImageUrl("");
			setFormCategory("");
			setFormOpen(false);
			getSubCategory();
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "An unknown error occurred";
			toast.error(errorMessage);
		}
	}

	return (
		<div className="flex min-h-screen bg-gray-900">
			<ToastContainer />
			<Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

			{/* Main Content */}
			<div
				className={`transition-all duration-300 p-6 w-full ${
					isSidebarOpen ? "ml-[260px]" : "ml-0"
				}`}
			>
				<header className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center sticky top-0 z-10">
					<h1 className="text-3xl font-bold text-gray-700">
						Admin Dashboard
					</h1>
					<Button
						onClick={() => setFormOpen(true)}
						className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
					>
						<FiPlus size={20} /> Add Product
					</Button>
				</header>

				{/* Loader */}
				{loading ? (
					<div className="flex justify-center items-center h-96">
						<Loader size={50} color="#3b82f6" type="spinner" />
					</div>
				) : (
					<div className="flex flex-wrap justify-center gap-6 p-6">
						{subCategory?.map((item, index) => (
							<div key={index} className="w-[280px]">
								<Card className="shadow-md border border-gray-300 bg-white rounded-lg">
									{/* Image */}
									<div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
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
												deleteSubCategory(item.id)
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
							</div>
						))}
					</div>
				)}
			</div>

			{/* Modal for Adding Category */}
			{formOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-xl font-bold mb-4">
							Add New SubCategory
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
								className="w-full border p-2 rounded mb-3"
								onChange={(e) =>
									setFormCategory(e.target.value)
								}
							>
								<option value="">-- Select Category --</option>
								{category.map((item, index) => (
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
							<ImageUpload
								uploadedImageUrl={uploadedImageUrl}
								setUploadedImageUrl={setUploadedImageUrl}
							/>
							<div className="flex justify-end gap-3 mt-4">
								<Button
									className="bg-gray-400 hover:bg-gray-500"
									onClick={() => setFormOpen(false)}
								>
									Cancel
								</Button>
								<Button className="bg-blue-600 hover:bg-blue-700">
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
