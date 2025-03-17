"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar"; // Ensure correct path
import { useRouter } from "next/navigation";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const router = useRouter();

	useEffect(() => {

			const token = localStorage.getItem("IndiaSalestoken");
			if (!token) {
				router.push("/signin");
			}
		
	}, [router]); 

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={`flex flex-col m-3 p-5 bg-slate-300 transition-all duration-300 ${
          isSidebarOpen ? "ml-[250px] w-[calc(100%-250px)]" : " w-full"
        }`}
      >
        <h1 className="text-2xl text-center font-bold">Admin Dashboard</h1>

      </div>
    </div>
  );
};

export default Admin;
