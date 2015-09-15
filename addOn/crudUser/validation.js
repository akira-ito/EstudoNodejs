var validator = require('validator');

module.exports.cadastrar = function(req, res, next){
  var name = req.body.nome;
  var password = req.body.senha;
  var email = validator.normalizeEmail(req.body.email);

  req.checkBody('nome', 'Digite o nome').trim().isNotNull();
  req.checkBody('nome', 'Nome inferior de 5 caracteres').isLength(5);
  req.checkBody('email', 'Digite o email').trim().isNotNull();
  req.checkBody('email', 'Email invalido').normalizeEmail().isEmail();
  req.checkBody('senha', 'Digite a senha').trim().isNotNull();
  req.checkBody('senha', 'Senha de tamanho invalido. (de 5 á 12 caracteres').isLength(5, 12);

  console.log(req.body, email);
  if (req.validationErrors().length){
    res.status(400).json(req.validationErrors());
  }else{
    next();
  }
}
