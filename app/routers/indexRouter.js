var express = require('express');
var router = express.Router();
var mysqlDB = require('../helpers/connectiontodb');
var func = require('../controllers/auth.controller.js');
let f = new func();
// const login = require('../views/auth/login.hbs');
// const signup = require('../views/auth/signout.hbs');

router.get('/',f.run);

router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/signup',(req,res)=>{
    res.render('signUp');
});

router.post('/object', async (request,response) => {
    const user = request.body;
    try {
        console.log(user);
        response.status(201).send(user);
    } catch(error) {
        response.status(400).send(error);
    }
});

module.exports = router;