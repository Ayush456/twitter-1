const express = require('express');
const router = express.Router();
const Search = require('../controllers/search.controller');
const search = new Search();
const searchValidator = require('../validators/search.validator');
const utils = require('../biz/utils');

router.post('',utils.verifyToken,searchValidator.validate('getList'),search.getList);

router.post('/users',utils.verifyToken,search.getUsers);

module.exports = router;