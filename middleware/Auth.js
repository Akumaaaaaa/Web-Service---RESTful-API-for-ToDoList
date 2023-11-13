const jwt = require("jsonwebtoken");
const Todo = require("../models/todo");
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        console.log("No Token provided");
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error("Error verifying token:", err);
        res.status(401).json({ message: "Invalid Token" });
    }
};

const authorize = async (req, res, next) => {
    console.log('User ID from token:', req.user._id);
    console.log('Todo ID from request:', req.params.id);

    try {
        const todo = await Todo.findOne({ _id: req.params.id, userId: req.user._id });
        
        if (!todo) {
            console.log('Authorization failed: Forbidden');
            return res.status(403).json({ message: "Forbidden" });
        }

        console.log('Authorization passed');
        next();
    } catch (err) {
        console.error('Error checking authorization:', err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = { authenticate, authorize };