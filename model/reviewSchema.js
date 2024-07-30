const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    title: String,
    review: String,
    createdAt: String,
});

const reviewSchemaModel = mongoose.model("reviewTable", reviewSchema);

module.exports = reviewSchemaModel;
