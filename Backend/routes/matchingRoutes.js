const express = require('express');
const router = express.Router();
const { calculateScore, batchMatchPostings } = require('../controllers/matchingController');

router.post('/score', calculateScore);
router.post('/batch', batchMatchPostings);

module.exports = router;
