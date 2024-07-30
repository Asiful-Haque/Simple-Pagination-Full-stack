const reviewSchemaModel = require("../model/reviewSchema.js");

exports.getReviews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 1;
    const skip = (page - 1) * limit;

    try {
        const reviews = await reviewSchemaModel.find().skip(skip).limit(limit);
        const total = await reviewSchemaModel.countDocuments();
        const totalPages = Math.ceil(total / limit);

        res.json({ reviews, totalPages });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};