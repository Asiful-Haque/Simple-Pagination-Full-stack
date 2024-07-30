const mongoose = require("mongoose");

//function for connecting the database
const connection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Travel_Review");
        console.log("DB is connected bro!!");
    } catch (error) {
        console.log("DB is not connected bro!!");
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connection;
