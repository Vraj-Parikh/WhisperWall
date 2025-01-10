import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
  if (connection.isConnected) return;
  try {
    console.log(process.env.MONGODB_URI);
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0]?.readyState ?? 0;
    console.log("DB Connected");
  } catch (error) {
    console.log("Database connection error:", error);
    process.exit(1);
  }
}

export default dbConnect;
