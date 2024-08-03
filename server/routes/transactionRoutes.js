const express = require('express');
const router = express.Router();
const { getTransaction } = require('../controllers/transactionController');

router.get('/transaction', getTransaction);

module.exports = router;
