"use client";

import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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

  // Convert File to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle Upload to GitHub
  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedImage) {
      toast.error("Please select an image first!");
      return;
    }

    try {
      // Convert image to Base64
      const base64Image = await convertToBase64(selectedImage);
      const base64WithoutPrefix = base64Image.split(",")[1]; // Remove "data:image/png;base64,"

      // Send to GitHub API via Next.js API route
      const response = await axios.post("/api/upload", {
        fileName: selectedImage.name,
        fileContent: base64WithoutPrefix,
      });

      if (response.data.status !== 200) {
        toast.error(response.data.message);
      } else {
        toast.success("Image uploaded successfully!");
        setUploadedImageUrl(response.data.imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
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
        onClick={handleUpload}
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
