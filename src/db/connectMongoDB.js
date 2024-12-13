import mongoose from "mongoose";


const connectMongoBD = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected: ${conn.connection.host}`)
    } catch (error){
        console.error(`Error connection to mongoDB: ${error.message}`);
        process.exit(1)
    }

}

export default connectMongoBD