import Product from "../models/Product.js";
import User from "../models/User.js";
import data from "../data.js";


const seedData = async (req, res) => {
    try {

        //await Product.deleteMany({});
        //await User.deleteMany({});

        await Promise.all([Product.deleteMany({}), User.deleteMany({})]);

        const createProducts = await Product.insertMany(data.products);

        const createUsers = await User.insertMany(data.users);

        res.send({ createProducts, createUsers });
    } catch (error) {
        console.log('failed to update users/products: ${error.message}');
    }
}

export default seedData;