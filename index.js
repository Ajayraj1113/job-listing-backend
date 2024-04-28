require('dotenv').config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const auth = require("./routes/auth");
const job = require("./routes/job")
const errorHandler = require("./midlleware/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected succesfully"))
    .catch((err) => console.log("Database connection failed!!", err));

app.use("/api/v1/auth", auth);
app.use("/api/v1/job", job);

app.use("/*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found!"});
})

app.use(errorHandler);

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