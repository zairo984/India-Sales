"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from "@/components/ImageUpload";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const Admin = () => {
	interface Category {
		id: string;
		name: string;
		description: string;
		imageUrl: string;
	}
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [category, setCategory] = useState<
		| { name: string; description: string; imageUrl: string; id: string }[]
		| null
	>(null);
	const [formOpen, setFormOpen] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [uploadedImageUrl, setUploadedImageUrl] = useState("");
	const [loading, setLoading] = useState(true);
	const [editFormOpen, setEditFormOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<Category|null>(null);

	/*************  ✨ Fetch Categories *************/
	async function getCategory() {
		try {
			const res = await axios.get(`/api/categories/`);
			setCategory(res.data.categories);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	/*************  ✨ Delete Category *************/
	async function deleteCategory(id: string) {
		try {
			await axios.delete(`/api/categories/`, {
				data: { id },
			});
			toast.success("Category deleted successfully");
			getCategory();
		} catch (err) {
			toast.error(
				err.response?.data?.message || "Error deleting category"
			);
		}
	}

	/*************  ✨ Open Edit Modal *************/
	const openEditForm = (item: Category) => {
		setSelectedCategory(item);
		setEditFormOpen(true);
	};

	/*************  ✨ Update Category *************/
	async function EditCategory(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			await axios.put(
				`/api/categories/`,
				selectedCategory
			);
			toast.success("Category updated successfully");
			setEditFormOpen(false);
			getCategory();
		} catch (err) {
			toast.error(
				err.response?.data?.message || "Error updating category"
			);
		}
	}

	/*************  ✨ Create Category *************/
	async function createCategory() {
		try {
			const res = await axios.post(
				`/api/categories/`,
				{ name, description, imageUrl: uploadedImageUrl },
				{ headers: { "Content-Type": "application/json" } }
			);
			toast.success(res.data.message);
			setName("");
			setDescription("");
			setUploadedImageUrl("");
			setFormOpen(false);
			getCategory();
		} catch (err:unknown) {
			toast.error(err.response?.data?.message || "An error occurred.");
		}
	}

	useEffect(() => {
		getCategory();
	}, []);

	return (
		<div className="flex min-h-screen bg-gray-100">
			<ToastContainer className={"z-50"} />
			<Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

			<div
				className={`transition-all duration-300 p-6 flex-1 ${
					isSidebarOpen
						? "ml-[250px] w-[calc(100%-250px)]"
						: "ml-0 w-full"
				}`}
			>
				<header className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center z-10">
					<h1 className="text-3xl font-bold text-gray-700">
						Admin Dashboard
					</h1>
					<Button
						onClick={() => setFormOpen(true)}
						className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
					>
						<FiPlus size={20} /> Add Category
					</Button>
				</header>

				{/* Category Display */}
				<div className="flex flex-wrap gap-6 justify-center items-center p-6">
					{loading ? (
						<div className="flex justify-center items-center h-96">
							<Loader type="dots" size={40} color="#3b82f6" />
						</div>
					) : category && category.length > 0 ? (
						category.map((item, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.05 }}
								className="w-[300px] p-4"
							>
								<Card className="shadow-lg border border-gray-200 bg-white rounded-lg">
									{/* Image Section */}
									<div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
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

									{/* Card Footer */}
									<CardFooter className="p-4 flex justify-between">
										<Button
											className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md"
											onClick={() => openEditForm(item)}
										>
											<FiEdit />
										</Button>
										<Button
											className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md"
											onClick={() =>
												deleteCategory(item.id)
											}
										>
											<FiTrash2 />
										</Button>
									</CardFooter>
								</Card>
							</motion.div>
						))
					) : (
						<p className="text-gray-500 text-center text-lg">
							No categories available
						</p>
					)}
				</div>
			</div>

			{/* Add Category Modal */}
			{formOpen && (
				<div className="fixed inset-0 bg-black z-50 bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-xl font-bold mb-4">
							Add New Category
						</h2>
						<form onSubmit={createCategory}>
							<input
								type="text"
								placeholder="Category Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full border p-2 rounded mb-3"
							/>
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

			{/* Edit Category Modal */}
			{editFormOpen && selectedCategory && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-xl font-bold mb-4">
							Edit Category
						</h2>
						<form onSubmit={EditCategory}>
							<input
								type="text"
								placeholder="Category Name"
								value={selectedCategory.name}
								onChange={(e) =>
									setSelectedCategory({
										...selectedCategory,
										name: e.target.value,
									})
								}
								className="w-full border p-2 rounded mb-3"
							/>
							<input
								type="text"
								placeholder="Description"
								value={selectedCategory.description}
								onChange={(e) =>
									setSelectedCategory({
										...selectedCategory,
										description: e.target.value,
									})
								}
								className="w-full border p-2 rounded mb-3"
							/>
							<ImageUpload
								uploadedImageUrl={selectedCategory.imageUrl}
								setUploadedImageUrl={(url) =>
									setSelectedCategory({
										...selectedCategory,
										imageUrl: url,
									})
								}
							/>
							<div className="flex justify-end gap-3 mt-4"></div>
							<div className="flex justify-end gap-3 mt-4">
								<Button
									type="button"
									onClick={() => setEditFormOpen(false)}
									className="bg-gray-400 hover:bg-gray-500"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-blue-600 hover:bg-blue-700"
								>
									Update
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
