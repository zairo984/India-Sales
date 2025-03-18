"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { FiUpload } from "react-icons/fi";
import Sidebar from "../../../components/Sidebar";
import ImageUpload from "@/components/ImageUpload";

const CertificationUpload = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [certName, setCertName] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(""); // Stores the image URL after upload
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!certName || !uploadedImageUrl) {
      toast.error("Please enter certification name and upload an image.");
      return;
    }

    setLoading(true);

    try {
      // Send only certName and file URL (not as a file)
      const res = await axios.post("/api/certificates", {
        certName,
        fileUrl: uploadedImageUrl, // Use fileUrl instead of appending as FormData
      });

      toast.success(res.data.message);
      setCertName("");
      setUploadedImageUrl(""); // Reset after upload
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      <ToastContainer />
      
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Upload Certification
        </h2>

        {/* Form */}
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Enter Certification Name"
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />

          {/* Image Upload Component */}
          <ImageUpload
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Uploading..."
            ) : (
              <>
                <FiUpload /> Upload
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CertificationUpload;
