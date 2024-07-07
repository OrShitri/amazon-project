import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getProductById, getProducts } from "../controllers/productController.js"


const productRouter = express.Router();
productRouter.get("/", expressAsyncHandler(getProducts));
productRouter.get("/:id", expressAsyncHandler(getProductById));

export default productRouter;