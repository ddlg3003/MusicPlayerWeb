const siteController = require('../app/controllers/SiteController');
const express = require('express');
const router = express.Router();

router.get('/', siteController.show);

module.exports = router;
