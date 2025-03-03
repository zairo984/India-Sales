"use client";

import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

type ImageUploadProps = {
	uploadedImageUrl: string;
	setUploadedImageUrl: (imageUrl: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
	uploadedImageUrl,
	setUploadedImageUrl,
}) => {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	// Handle Image Selection
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedImage(file);
			setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
		}
	};

	// Handle Upload
	const handleUpload = async (event: React.FormEvent) => {
		event.preventDefault()

		if (!selectedImage) {
			toast.error("Please select an image first!");
			return;
		}

		const formData = new FormData();
		formData.append("image", selectedImage); // ✅ Send file as formData

		try {
			const response = await axios.post("/api/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			if(response.data.status  != 200){toast.error(response.data.message)}
			else{toast(response.data.message);}
			const data = response.data;
			// console.log("Uploaded Image URL:", data.imageUrl);
			setUploadedImageUrl(data.imageUrl); // ✅ Show uploaded image
		} catch (error) {
			// console.log("Error uploading image:", error);
			toast.error("Error uploading image");
		}
	};

	return (
		
		<div className="p-6 bg-white shadow-md rounded-lg">
			<ToastContainer/>
			<h2 className="text-xl font-semibold mb-4">Upload Product Image</h2>

			<input
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				className="mb-4"
			/>

			{/* Image Preview */}
			{previewUrl && (
				<div className="mb-4">
					<img
						src={previewUrl}
						alt="Preview"
						className="w-40 h-40 object-cover rounded-lg shadow-md"
					/>
				</div>
			)}

			{/* Upload Button */}
			<button
				onClick={(event) => handleUpload(event)}
				className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
			>
				Upload Image
			</button>

			{/* Show Uploaded Image Immediately */}
			{uploadedImageUrl && (
				<div className="mt-4">
					<p className="text-gray-600">Uploaded Image:</p>
					<img
						src={uploadedImageUrl}
						alt="Uploaded"
						className="w-40 h-40 object-cover rounded-lg shadow-md"
					/>
				</div>
			)}
		</div>
	);
};

export default ImageUpload;
