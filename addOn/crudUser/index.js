var jade = require('jade');
var User = require('./model');

module.exports = function(){
  return {
    name: "CrudUser",
    router: {
      '/': {
        method: 'get',
        action: function(req, res){
          console.log('chamandoooooooooo');
          var html = jade.renderFile(__dirname+'/view/index.jade');
          res.set('Content-Type', 'text/html');
          res.send(html);
        }
      },
      '/cadastrar': {
        method: 'post',
        action: function(req, res){
          console.log('cadastro 2222');

          var newUser = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
          });
          console.log('dddddddddddddd 2222');

          User.find({}, function(err, users){
            if (err){
              console.log(555);
            }
            console.log(users);
          })
          console.log('fimss');
          newUser.save(function(err){
            if (err){
              console.log('erro');
              res.json('erro');
            }else{
              console.log('salvo');
              res.json('salvo');
            }
          })
        }
      }
    }
  }
}
