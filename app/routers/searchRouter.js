const express = require('express');
const router = express.Router();
const Search = require('../controllers/search.controller');
const search = new Search();
const searchValidator = require('../validators/search.validator');

router.get('/',searchValidator.validate('getList'),search.getList);

module.exports = router;