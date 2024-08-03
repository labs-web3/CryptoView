const express = require('express');
const { getNFTMetaData } = require('../controllers/nftController');

const router = express.Router();

router.get('/nft/:contractAddress/:tokenId', getNFTMetaData);

module.exports = router;
