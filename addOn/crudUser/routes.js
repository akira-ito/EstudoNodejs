var jade = require('jade');
var fs = require('fs');
var mongoose = require('mongoose');
var config = require('./config')();
mongoose.connect(config.database['mongoose']);
var User = require('./model').User;

var AppRouter = function(){};

AppRouter.prototype.index = function(req, res){
  var html = jade.renderFile(__dirname+'/view/index.jade');
  res.set('Content-Type', 'text/html');
  res.send(html);
}

AppRouter.prototype.cadastrar = function(req, res){
  var newUser = new User({
    name: req.body.nome,
    password: req.body.senha,
    email: req.body.email
  });
  newUser.save(function(err){
    if (err){
      res.status(500).send(err);
    }else{
      res.json(newUser);
    }
  })
}

AppRouter.prototype.buscar = function(req, res){
  var find = {
    name: new RegExp(req.body.nome, "i"),
    email: new RegExp(req.body.email, "i"),
    password: new RegExp(req.body.senha, "i")
  };
  
  User.find(find, function(err, users){
    if (err){
      res.status(500).send(err);
    }else{
      res.json(users);
    }
  })
}

AppRouter.prototype.excluir = function(req, res){
  User.findById(req.params.id, function(err, user){
    if (err){
      res.status(500).send(err);
    }else if (!user){
      res.status(400).send("Usuario nao cadastrado.");
    }else{
      user.remove(function(){
        res.send("Usuario excluido com sucesso.");
      })
    }
  })
}

AppRouter.prototype.alterar = function(req, res){
  var updated = {
    name: req.body.nome,
    email: req.body.email,
    password: req.body.senha
  }
  User.findByIdAndUpdate(req.params.id, updated, function(err, user) {
    if (err) {
      res.status(500).send(err);
    }else{
      res.send(user);
    }
  });
}

AppRouter.prototype.get = function(req, res){
  if (req.params.get != "render"){
    fs.exists(__dirname+'/view/' + req.params.get+'.jade', function(exists) {
      var html = "";
      if (!exists){
        html = jade.renderFile(__dirname+'/view/notFound.jade');
        res.status(404);
      }else{
        html = jade.renderFile(__dirname+'/view/index.jade');
      }
      res.set('Content-Type', 'text/html');
      res.send(html);
    });
  }
}

AppRouter.prototype.render = function(req, res){
  console.log('req.params.page', req.params.page);
  if (req.params.page == "notFound"){
	  var html = jade.renderFile(__dirname + '/view/notFound.jade');
    console.log('-->', html);
	  res.set('Content-Type', 'text/html');
  	res.status(200).send(html);
  }else{
	  var html = jade.renderFile(__dirname + '/view/'+req.params.page+'.jade');
	  res.set('Content-Type', 'text/html');
	  res.send(html);
	}
}


var instance;
module.exports = function () {
    if (!instance) {
        instance = new AppRouter();
    }
    return instance;
};

mongoose.connection.on("error", function(err) {
  console.log('Mongoose: Falha ao conectar BD: ', err.message);
});

var exit = function() { 
  mongoose.connection.close(function () {
    console.log('Mongoose: Conexão encerrada');
    process.exit(0);
  });
}

process.on('SIGINT', exit).on('SIGTERM', exit);