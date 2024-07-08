import express from "express";
import {
    getProductById,
    getProducts,
    getProductByToken,
} from "../controllers/productController.js";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();
productRouter.get("/", expressAsyncHandler(getProducts));
productRouter.get("/token/:token", expressAsyncHandler(getProductByToken));
productRouter.get("/:id", expressAsyncHandler(getProductById));
export default productRouter;
