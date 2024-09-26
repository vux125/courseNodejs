const express = require('express');
const userPoint = require('../controllers/userinfor.ctr');

const router = express.Router();

router.get('/', userPoint);

module.exports = router;