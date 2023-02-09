const express = require("express");

const router = express.Router();
const Newslettercontroller = require("../controllers/Newsletter");

// TODO add auth middleware to all the routes
router.post("/", Newslettercontroller.createNewsletters);

 
module.exports = router;