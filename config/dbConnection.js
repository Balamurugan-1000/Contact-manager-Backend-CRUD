import mongoose from "mongoose";

const connectdb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`Connection Successfull \nhost : ${connect.connection.host} \n dbName : ${connect.connection.name}`)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}


export default connectdb