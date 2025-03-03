"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { FiUpload } from "react-icons/fi";
import Sidebar from "../../../components/Sidebar";

const CertificationUpload = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [certName, setCertName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName || !file) {
      toast.error("Please enter certification name and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("certName", certName);
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post("/api/certificates", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      setCertName("");
      setFile(null);
      setPreview(null);
    } catch (err: unknown) {
      toast.error(err.response?.data?.message || "File upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg  shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Upload Certification</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Certification Name"
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            accept=".jpg,.png,.pdf"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />

          {preview && (
            <div className="w-full flex justify-center">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2">
            {loading ? "Uploading..." : <><FiUpload /> Upload</>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CertificationUpload;
