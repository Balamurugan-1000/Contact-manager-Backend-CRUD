import express from "express";
import userRoutes from './routes/userRoutes.js'
import router from './routes/ContactRoute.js'
import errorHandler from "./middleware/errorHandler.js";
import connectdb from "./config/dbConnection.js";
import * as dotenv from "dotenv";
dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use('/api/contacts', router)
app.use('/api/users', userRoutes)
app.use(errorHandler)


connectdb()



app.listen(port, () => {
    console.log("server Up!!! on port:", port)
})