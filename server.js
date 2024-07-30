const express = require("express");
const dashboardRoutes = require("./routes/dashboard.js");
const connectDB = require("./model/db.js");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8005;

//database
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("view"));

//routes
app.use(dashboardRoutes);


app.get("/", (req, res) => {
    // res.send("hello");
    res.sendFile(path.join(__dirname, "view", "dashboard.html"));
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
