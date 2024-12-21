import mongoose, { Error } from "mongoose";

const connect =  async (params) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Db connected successfully");
        
    } catch (error) {
        throw new Error("Error in connecting mongodb")
    }
}

export default connect;