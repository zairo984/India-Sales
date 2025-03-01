"use client"

import React from "react";
import jwt from "jsonwebtoken";
import axios from "axios";


const page = () => {

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try{
            const response = await axios.post("/api/signin",{username,email,password});
            const token = response.data.token;
            localStorage.setItem("IndiaSalestoken",token);
            const decodedToken = jwt.decode(token);
            window.location.href = "/admin";
            console.log(decodedToken);
        }catch(error){
            console.log(error)
        }
    }

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="flex flex-col justify-center w-full items-center h-[60%] text-black gap-5">
				<form onSubmit={(e)=>{handleSubmit(e)}} className="flex flex-col gap-4 border-[3px] border-gray-300 bg-white shadow-lg w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] p-6 rounded-lg">
					<h2 className="text-2xl font-semibold text-center text-gray-800">
						Login
					</h2>

					<div className="flex flex-col">
						<label className="text-sm font-medium text-gray-700">
							Username
						</label>
						<input
                        name="username"
							type="text"
							placeholder="Enter your username"
							className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium text-gray-700">
							Email
						</label>
						<input
                        name="email"
							type="email"
							placeholder="Enter your email"
							className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-medium text-gray-700">
							Password
						</label>
						<input
                        name="password"
							type="password"
							placeholder="Enter your password"
							className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
						/>
					</div>

					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition-all duration-200"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default page;
