const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
    getAllUser: async (req, res) => {
        const users = await User.find();

        res.json({
            message: "Successfully Get User Data",
            data: users,
        });
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            const { _id, name, username, email } = user;
            res.json({
                message: "Successfully Get User Data",
                data: { _id, name, username, email },
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },

    createUser: async (req, res) => {
        try {
            let data = req.body;
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
    
            const newUser = await User.create(data);
    
            res.json({
                message: "Successfully Create User Data",
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },    

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ user: { _id: user._id } }, process.env.JWT_SECRET);

            res.json({
                message: "Successfully logged in",
                token,
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },
};