const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', function (req, res) {
    return res.render("index", {userId: uuidv4()});
});

module.exports = router;
