//Import Statements
import mongoose from "mongoose";

//Connect Database Function
export const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`Successfully connected to the database ${connect.connection.name} ${connect.connection.host}`.bgCyan.white)
    }
    catch (error) {
        console.error(`Error while connecting to the database ${error}`.bgRed.white)
    }

}

