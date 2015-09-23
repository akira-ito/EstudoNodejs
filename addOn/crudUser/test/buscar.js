var async = require('async');
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

			async.eachSeries(tests, function(test, callback){
				User["find"] = function(find){
					find.should.be.an.Object;
					find.should.have.properties("name", "email", "password");
					find.should.have.property("name", new RegExp(test.nome, 'i'));
					find.should.have.property("email", new RegExp(test.email, 'i'));
					find.should.have.property("password", new RegExp(test.senha, 'i'));
					callback();
				};
				req.body.nome = test.nome;
				req.body.email = test.email;
				req.body.senha = test.senha;
				routes().buscar(req, null);
			}, function(err){
				done(err);
			});
		});
		it ('Validando a chamada do retorno 500', function(done){
			User["find"] = function(find, callback){
				callback(new Error('Falha ao buscar usuarios.'));
			};

			var res = {
				status: function(stat){
					return {
						send: function (err){
							should.exist(stat);
							(stat).should.equal(500);
							should.exist(err);
							(err).should.be.an.instanceOf(Error);
							(err.message).should.equal('Falha ao buscar usuarios.');
							done();
						}
					}
				}
			};
			req.body.nome = "Fernando José";
			req.body.email = "jose.fern@ando.com";
			req.body.senha = "2332dds";
			routes().buscar(req, res);
		});
		it ('Validando a chamada do retorno 200', function(done){
			User["find"] = function(find, callback){
				callback(null, [{name: 'teste', email: 'sdfd@sdfasdf.com', password: 'lfj388sj'}, {name:'Maria Joelma', email: 'maria@joelma.org', password: 'marjoelma'}]);
			};

			var res = {
				json: function(json){
					should.exist(json);
					(json).should.be.an.instanceOf(Array);
					(json).should.have.length(2);
					(json[0]).should.have.property('name', 'teste');
					(json[0]).should.have.property('email', 'sdfd@sdfasdf.com');
					(json[0]).should.have.property('password', 'lfj388sj');
					(json[1]).should.have.property('name', 'Maria Joelma');
					(json[1]).should.have.property('email', 'maria@joelma.org');
					(json[1]).should.have.property('password', 'marjoelma');
					done();
				}
			};
			req.body.nome = "Fernando José";
			req.body.email = "jose.fern@ando.com";
			req.body.senha = "2332dds";
			routes().buscar(req, res);
		});
	})
})
