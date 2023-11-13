const express = require("express");
const route = express.Router();

const { authenticate } = require('../middleware/Auth');

const {
    getAllUser,
    getUserById,
    createUser,
    loginUser,
} = require("../controllers/user-controller");

// Public routes (not requiring authentication)
route.post("/login", loginUser);
route.post("/", createUser);

// Protected routes (requiring authentication)
route.use(authenticate);
route.get("/", getAllUser);
route.get("/:id", getUserById);

module.exports = route;
