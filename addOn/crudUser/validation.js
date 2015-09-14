var validator = require('validator');

module.exports.cadastrar = function(req, res, next){
  var name = req.body.nome;
  var password = req.body.senha;
  var email = validator.normalizeEmail(req.body.email);

  console.log('email', validator.isEmail(email), validator.normalizeEmail(email));

  if (validator.isNull(name)){
    res.status(400).send('Nome é obrigatorio');
  }else if (validator.isEmail(email)){
    res.status(400).send('Email é obrigatorio');
  }else{  
    next();
  } 
}