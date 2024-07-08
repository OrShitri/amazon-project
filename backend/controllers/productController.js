import Product from "../models/Product.js";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (err) {
        console.log(err.message);
    }
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product Not found" });
    }
};

const getProductByToken = async (req, res) => {
    // const product = await Product.findOne({ token: req.params.token });
    // if (product) {
    //   res.send(product);
    // } else {
    //   res.status(404).send({ message: "Product Not found" });
    // }
    try {
        const product = await Product.findOne({ token: req.params.token });
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: "Server Error" });
    }
};

export { getProducts, getProductById, getProductByToken };
