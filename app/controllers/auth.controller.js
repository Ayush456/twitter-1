const sha1 = require('sha1');
class func {
    run(req,res){
       res.send('ayush: '+sha1('ayush')+" &nbsp; &nbsp; ayush$: "+sha1('ayush$'));          
    }
}

module.exports = func;