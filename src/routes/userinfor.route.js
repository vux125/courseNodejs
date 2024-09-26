const express = require('express');
const userInfor = require('../controllers/userinfor.ctr');

const router = express.Router();

router.get('/', userInfor);

module.exports = router;