import mongoose from "mongoose";

const { DB_URL, DB_NAME } = process.env;

const connectToDB = async () => {
    try {
        await mongoose.connect(`${DB_URL}/${DB_NAME}`)
        console.log("MONGODB connected !!");
    } catch (error) {
        console.log(`Connection to MONGODB failed... !`, error);
        throw error;
    }
};

export default connectToDB;