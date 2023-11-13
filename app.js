const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const db = require("./config/db")
const allRoutes = require("./routes")

// Connect to MongoDB
db.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
})

// Route
app.use(express.json());
app.use(allRoutes)

app.listen(3000, () => {
    console.log('Server Listening on Port ' + PORT);
});