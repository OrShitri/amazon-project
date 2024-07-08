import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils.js";

const signIn = async (req, res) => {
    // Sign in logic here
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user),
        });
    } else {
        res.status(401).send({ message: "User not found" });
    }
};

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const token = generateToken(user);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export { signIn, signUp };
