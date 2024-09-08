const express = require("express");
const home = require('../controllers/home.ctr');
const router = express.Router();

router.get('/', home);

module.exports = router;