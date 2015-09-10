var jade = require('jade');

module.exports = function(){
  return {
    name: "CrudUser",
    active: true,
    router: {
      '/': {
        method: 'get',
        action: function(req, res){
          var html = jade.renderFile(__dirname+'/view/index.jade');
          res.set('Content-Type', 'text/html');
          res.send(html);
        }
      },
      '/:get': {
        method: 'get',
        action: function(req, res){
          if (req.params.get != "render"){
            var html = jade.renderFile(__dirname+'/view/index.jade');
            res.set('Content-Type', 'text/html');
            res.send(html);
          }
        }
      },
      '/cadastrar': {
        method: 'post',
        action: function(req, res){
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
      },
      '/buscar': {
        method: 'post',
        action: function(req, res){
          var nome = req.body.nome;
          var email = req.body.email;
          var password = req.body.senha;

          var User = require('./model');
          User.find({name: nome}, function(err, users){
            if (err){
              res.status(500).send(err);
            }else{
              res.json(users);
            }
          })
        }
      },
      '/render/:page': {
        method: 'get',
        action: function(req, res){
          var html = jade.renderFile(__dirname + '/view/'+req.params.page+'.jade');
          res.set('Content-Type', 'text/html');
          res.send(html);
        }
      }
    }
  }
}
