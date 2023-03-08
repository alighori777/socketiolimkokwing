const express = require("express");

// Controllers
const fileControllers = require("./../controllers/file.js")

const router = express.Router();

router
    .post('/upload', fileControllers.getRecentConversation);

module.exports = router;