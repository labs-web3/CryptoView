const express = require('express');
const router = express.Router();
const { getTokenBalance } = require('../controllers/tokenController');

router.get('/balance/:contractAddress/:walletAddress', getTokenBalance);

module.exports = router;
