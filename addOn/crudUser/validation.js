
module.exports.cadastrar = function(req, res, next){
  req.checkBody('nome', 'Digite o nome').trim().escape().isNotNull();
  req.checkBody('nome', 'Nome inferior de 5 caracteres').isLength(5);
  req.checkBody('email', 'Digite o email').trim().isNotNull();
  req.checkBody('email', 'Email invalido').normalizeEmail().isEmail();
  req.checkBody('senha', 'Digite a senha').trim().isNotNull();
  req.checkBody('senha', 'Senha de tamanho invalido. (de 5 á 12 caracteres)').isLength(5, 12);

  if (req.validationErrors().length){
    res.status(400).json(req.validationErrors());
  }else{
    next();
  }
}

module.exports.excluir = function(req, res, next){
  req.checkParam('id', 'Id inválido.').trim().isNotNull();
  
  if (req.validationErrors().length){
    res.status(400).json(req.validationErrors());
  }else{
    next();
  }
}

module.exports.alterar = function(req, res, next){
  req.checkParam('id', 'Id inválido.').trim().isNotNull();

  req.checkBody('nome', 'Digite o nome').trim().escape().isNotNull();
  req.checkBody('nome', 'Nome inferior de 5 caracteres').isLength(5);
  req.checkBody('email', 'Digite o email').trim().isNotNull();
  req.checkBody('email', 'Email invalido').normalizeEmail().isEmail();
  req.checkBody('senha', 'Digite a senha').trim().isNotNull();
  req.checkBody('senha', 'Senha de tamanho invalido. (de 5 á 12 caracteres)').isLength(5, 12);

  if (req.validationErrors().length){
    res.status(400).json(req.validationErrors());
  }else{
    next();
  }
}
