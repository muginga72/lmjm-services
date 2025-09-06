const express = require('express');
const router = express.Router();
const { signin, signout } = require('../controllers/authController');

router.post('/signin', signin);
router.post('/signout', signout);

module.exports = router;