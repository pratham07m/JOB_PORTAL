import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to MongoDB ${mongoose.connection.host} `);
    } catch (error) {
        console.log(`mongoDB Erorr ${error}`);
    }
};

export default connectDB;