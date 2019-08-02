const sha1 = require('sha1');
const mysqlDB = require('../helpers/connectiontodb');

class AuthController {
    run(req,res){
       res.send('ayush: '+sha1('ayush')+" &nbsp; &nbsp; ayush$: "+sha1('ayush$'));          
    }

    login(req,res){
        res.render('login',{data:null});
    }
    
    checkLoginReg(req,res){
      let email = req.body.username;
      let pass = req.body.password;
    //   pass = pass.trim(); 
    //   console.log(email+" "+pass); 
      
        mysqlDB.query('select count(*) as num_count from user where user_name=? and user_password=?',[email,pass],function(err,result){
            console.log(result[0].num_count);
            res.status(200).send((result[0].num_count).toString());
        });
    //   return res.status(302).redirect('/login');         
    };

}

module.exports = AuthController;