import mongoose from "mongoose";
const Mongo_URL = process.env.MONGODB_URI as string;

export const connectDB = async () => {
	try {
		await mongoose.connect(Mongo_URL, { dbName: "Sales" });
		// console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};
