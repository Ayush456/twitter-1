const sha1 = require('sha1');
const mysqlDB = require('../helpers/connectiontodb');
const path = require('path');
const shortid = require('shortid');
class AuthController {
    run(req,res){
       res.send('ayush: '+sha1('ayush')+" &nbsp; &nbsp; ayush$: "+sha1('ayush$'));          
    }

    login(req,res){
        res.render('login',{data:null});
    }
    
    checkLoginReg(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      let email = req.body.user_email;
      let pass = req.body.user_password;
      console.log(req.body);
      
      mysqlDB.query('select * from user where user_email=? and user_password=?',[email,pass],function(err,result){
        if(err){
            throw err;
        } 
        else{
            console.log(result[0]);
            res.status(200).send(result[0]);
        }
      });
      
    };

    signupReq(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const user = req.body;
        const  user_id = user.username + shortid.generate();
        console.log(user_id);


        mysqlDB.query(`insert into user (user_id,user_name,user_password,user_password_hash,user_dob,user_email,_isactive) values (?,?,?,?,?,?,?)`,[user_id,user.username,user.user_password,sha1(''+user.user_password),user.dob,user.user_email,1], function(err,result){
            if(err){
                throw err;
               
            }else{
                console.log('user inserted into database');
                res.status(200).send({ insertStatus: '1', user:user, user_id: user_id });
            }
        });

    }

}

module.exports = AuthController;