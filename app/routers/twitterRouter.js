var express = require('express');
var router = express.Router();
var mysqlDB = require('../helpers/connectiontodb');

// const base = require('../views/layouts/base.hbs');
// const home = require('../views/home.hbs');

router.get('/base',(req,res) => {
    res.render('base');
});

router.get('/',(req,res) => {
    res.render('home');
});

module.exports = router;