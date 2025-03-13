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
  // const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  // const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const selectedFile = e.target.files[0];
  //     setFile(selectedFile);
  //     setPreview(URL.createObjectURL(selectedFile));
  //   }
  // };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName || !uploadedImageUrl) {
      toast.error("Please enter certification name and select a file.");
      return;
    }

    const formData = new FormData();
    console.log("certName: ", certName, uploadedImageUrl);
    formData.append("certName", certName);
    formData.append("file", uploadedImageUrl);

    setLoading(true);
    try {
      console.log("formData: ", formData);
      const res = await axios.post("/api/certificates", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      setCertName("");
      // setFile(null);
      // setPreview(null);
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
      <div className="bg-white p-6 rounded-lg  shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Upload Certification
        </h2>
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
          onClick={handleUpload}
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
      </div>
    </div>
  );
};

export default CertificationUpload;
