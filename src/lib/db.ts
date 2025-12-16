import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

// Global is used here to maintain a cached connection across hot reloads in development
declare global {
	// eslint-disable-next-line no-var
	var mongooseConnection: {
		conn: typeof mongoose | null;
		promise: Promise<typeof mongoose> | null; 
	};
}

let cached = global.mongooseConnection;

if (!cached) {
	cached = global.mongooseConnection = { conn: null, promise: null };
}

export const connectDB = async (): Promise<typeof mongoose> => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			dbName: "Sales",
			bufferCommands: false,
			maxPoolSize: 10,
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			console.log("Connected to MongoDB");
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		cached.promise = null;
		console.error("Error connecting to MongoDB:", error);
		throw error;
	}

	return cached.conn;
};

// Helper to check connection status
export const isConnected = (): boolean => {
	return mongoose.connection.readyState === 1;
};
