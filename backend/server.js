import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

//not found handler
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("server running on port" + process.env.PORT);
        });
    }).catch((err) => {
        console.log(err.message);
    });