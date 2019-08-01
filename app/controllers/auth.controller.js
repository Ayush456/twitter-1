const sha1 = require('sha1');
class AuthController {
    run(req,res){
       res.send('ayush: '+sha1('ayush')+" &nbsp; &nbsp; ayush$: "+sha1('ayush$'));          
    }

    login(req,res){
        res.render('login',{data:null});
    }
    
    checkLoginReg(req,res){
      let email = req.body.email;
      let pass = req.body.password; 
      console.log(email+" "+pass); 
      return res.status(302).redirect('/login');      
    };
}

module.exports = AuthController;