var jade = require('jade');
var fs = require('fs');
require('mongoose').connect('mongodb://localhost/crudUser');

module.exports.index = function(req, res){
  var html = jade.renderFile(__dirname+'/view/index.jade');
  res.set('Content-Type', 'text/html');
  res.send(html);
}

module.exports.cadastrar = function(req, res){
  var User = require('./model');

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

module.exports.buscar = function(req, res){
  var find = {
    name: req.body.nome || "",
    email: req.body.email || "",
    password: req.body.senha || ""
  };
  if (find.name.trim() == ""){
    delete find.name;
  }
  if (find.email.trim() == ""){
    delete find.email;
  }
  if (find.password.trim() == ""){
    delete find.password;
  }
  var User = require('./model');
  User.find(find, function(err, users){
    console.log("fim", err, users, find);
    if (err){
      res.status(500).send(err);
    }else{
      res.json(users);
    }
  })
}

module.exports.get = function(req, res){
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

module.exports.render = function(req, res){
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
