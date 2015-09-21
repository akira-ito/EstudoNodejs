var should = require('should');
var rewire  = require('rewire');
var validation = require('../validation');
var routes = rewire('../routes');
var utils = require('../../utils.js');
var req, res, before, model;


describe('Testando o Middleware /buscar', function(done){
	describe('Routes', function(done){
		var funct, req, User;
		beforeEach(function(){
			req = {'body': {}, 'params': {}, 'query': {} }; 
			User = routes.__get__('User');
		})

		it ('Validando a montagem do Object de busca com nulos', function(done){
			User["find"] = function(find, callback){
				find.should.be.an.Object;
				find.should.have.properties("name", "email", "password");
				find.should.have.property("name", /(?:)/i);
				find.should.have.property("email", /(?:)/i);
				find.should.have.property("password", /(?:)/i);
				done();
			};
			routes().buscar(req, null);
		})
		it ('Validando a montagem do Object de busca com valores', function(done){
			var tests = [
				{nome: "edson akira", email: "edson@kdka.com", senha: "243214324"}, 
				{nome: "Jose Arruda", email:"Testando@yahoo.com", senha: "jsn43o32u"},
				{nome: "Ana Maria", senha:"", email:"kej3js@jd.xos"}
			];

			var index = 0;
			User["find"] = function(find, callback){
				find.should.be.an.Object;
				find.should.have.properties("name", "email", "password");
				find.should.have.property("name", new RegExp("/("+ tests[index].nome +")/i"));
				find.should.have.property("email", /(tests[index].email)/i);
				find.should.have.property("password", /(tests[index].senha)/i);
				done();
			};
			tests.forEach(function(test){
				req.body.nome = test.nome;
				req.body.email = test.email;
				req.body.senha = test.senha;
				routes().buscar(req, null);
				index++;
			})
		})
	})
})
