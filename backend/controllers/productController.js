import Product from "../models/Product.js";


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);

    } catch (error) {

    }
}

export { getProducts };