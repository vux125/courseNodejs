const express = require('express');
const userFee = require('../controllers/userinfor.ctr');

const router = express.Router();

router.get('/', userFee);

module.exports = router;