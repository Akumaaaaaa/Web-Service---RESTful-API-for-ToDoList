const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

const db = require("./config/db")
const allRoutes = require("./routes")

// Connect to MongoDB
db.then(() => {
    app.listen(PORT, () => {
        console.log('Server Listening on Port ' + PORT);
    });
})
.catch((err) => {
    console.log(err);
});

// Route
app.use(express.json());
app.use(allRoutes)

app.listen(3000, () => {
    console.log('Server Listening on Port ' + PORT);
});