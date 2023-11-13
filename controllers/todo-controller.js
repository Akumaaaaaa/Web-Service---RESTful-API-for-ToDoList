const Todo = require("../models/todo");
const { authenticate, authorize } = require('../middleware/Auth');

module.exports = {
    getAllTodos: async (req, res) => {
        try {
            const todos = await Todo.find({ userId: req.user._id });
            res.json({
                message: "Successfully Get Todo Data",
                data: todos,
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },  

    getTodoById: async (req, res) => {
        try {
            const todo = await Todo.findOne({ _id: req.params.id, userId: req.user._id });
            if (!todo) {
                return res.status(404).json({
                    message: "Todo not found",
                });
            }
            res.json({
                message: "Successfully Get Todo Data",
                data: todo,
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },

    createTodo: async (req, res) => {
        try {
            const data = req.body;
            data.userId = req.user._id;
            await Todo.create(data);
            res.status(201).json({
                message: "Successfully Create Todo Data",
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },

    updateTodo: [authenticate, authorize, async (req, res) => {
        try {
            const updatedTodo = await Todo.findOneAndUpdate(
                { _id: req.params.id, userId: req.user._id },
                req.body,
                { new: true }
            );
            if (!updatedTodo) {
                return res.status(404).json({
                    message: "Todo not found",
                });
            }
            res.json({
                message: "Successfully Update Todo Data",
                data: updatedTodo,
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }],

    deleteTodo: [authenticate, authorize, async (req, res) => {
        try {
            const deletedTodo = await Todo.findOneAndDelete({
                _id: req.params.id,
                userId: req.user._id,
            });
            if (!deletedTodo) {
                return res.status(404).json({
                    message: "Todo not found",
                });
            }
            res.json({
                message: "Successfully Delete Todo Data",
                data: deletedTodo,
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }],

    deleteAllTodos: async (req, res) => {
        try {
            const deletedTodos = await Todo.deleteMany({ userId: req.user._id });
            res.json({
                message: "Successfully Delete All Todos Data",
                data: deletedTodos,
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },
};
