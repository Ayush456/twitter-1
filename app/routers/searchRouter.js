const express = require('express');
const router = express.Router();
const Search = require('../controllers/search.controller');
const search = new Search();
const searchValidator = require('../validators/search.validator');

router.post('/',searchValidator.validate('getList'),search.getList);

router.post('/users',search.getUsers);

module.exports = router;