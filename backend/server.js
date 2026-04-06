const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log("DB CONNECTION ERROR: ", err));

app.get("/", (req, res) => {
    res.send("Backend is running")
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${PORT}`)
})