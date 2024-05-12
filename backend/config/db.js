import mongoose from "mongoose";
import Color from "color";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_URI);
        console.log(`MongoDb Connected Successfully : ${conn.connection.host}`);
        
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;