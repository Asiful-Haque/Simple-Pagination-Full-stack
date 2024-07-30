const express = require("express");
const { getReviews } = require("../controller/dashboardController");

const router = express.Router();

router.get("/api/getReviews", getReviews);

module.exports = router;
