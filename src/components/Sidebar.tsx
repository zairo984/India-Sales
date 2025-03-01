"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) => {
//   const [open, setOpen] = useState(true); 

  return (
    <div className="relative flex z-70">

      <button
        onClick={() => setOpen(!open)}
        className="fixed top-3 left-5 z-50 bg-transparent  text-3xl p-2 rounded cursor-pointer"
      >
        <IoIosMenu />
      </button>


      <div
        className={`fixed top-0 left-0  h-screen bg-slate-700 text-center flex flex-col justify-start gap-5 p-5 transition-all duration-300 ${
          open ? "w-[250px]" : "invisible"
        }`}
      >

        
          <Image src="/images/logo.jpg" alt="logo" width={100} height={100} className="mx-auto" />
        

        {/* Navigation Links */}
        <div className="flex flex-col gap-5 justify-center">
          <Link className="text-white border-b-2 w-[80%] hover:bg-red-400 p-2 mx-auto" href="/admin">
            Home
          </Link>
          <Link className="text-white border-b-2 w-[80%] hover:bg-red-400 p-2 mx-auto" href="/admin/categories">
            Categories
          </Link>
          <Link className="text-white border-b-2 w-[80%] hover:bg-red-400 p-2 mx-auto" href="/admin/subCategories">
            SubCategories
          </Link>
          <Link className="text-white border-b-2 w-[80%] hover:bg-red-400 p-2 mx-auto" href="/admin/products">
            Products
          </Link>
          <Link className="text-white border-b-2 w-[80%] hover:bg-red-400 p-2 mx-auto" href="/admin/profile">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
