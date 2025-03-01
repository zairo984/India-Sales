import { time } from "console";
import { User } from "lucide-react";
import mongoose from "mongoose";

export interface User {
	name: string;
	email: string;
	password: string;
}
const UserSchema = new mongoose.Schema<User>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);
const User =mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default User;
