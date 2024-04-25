require('dotenv').config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected succesfully"))
    .catch((err) => console.log("Database connection failed!!", err))

app.get("/health", (req, res) => {
    // console.log("Client has made a api request");
    res.json({ 
        service : "Job Listing Backend API Server", 
        active: true, 
        time: new Date()
    });
});


app.listen(PORT, () => {
    console.log(`Backend server running at http://${HOST}:${PORT}`);
});