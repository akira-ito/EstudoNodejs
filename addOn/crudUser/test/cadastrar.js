var should = require('should');
var rewire  = require('rewire');
var validation = require('../validation');
var routes = rewire('../routes');
var utils = require('../../utils.js');
var req, res, before, model;

beforeEach( before = function() {
	req = {
		'body': {},
		'params': {},
		'query': {}
	};
	res = {
		'status': function(stat){
			var self = this;
			self.stat = stat;
			return {
				'json': function(errs){
					self.errs = errs;
				},
				'send': function(data){
					self.data = data;
				}
			}
		},
		'json': function(data){
			this.data = data;
		}
	};
	utils.middleware.validator(req, res, function(){});
});

describe('Testando o Middleware /cadastrar', function(done){
	describe('Validation', function(done){
		it('Validando todos os campos nulos', function(done){
			var next = function(){};
			validation.cadastrar(req, res, next);
			(res['stat']).should.be.exactly(400);
			(res['errs']).should.have.length(3);
			(res['errs'][0]).should.have.property('campo', 'nome');
			(res['errs'][0]).should.have.property('mensagem', 'Digite o nome');
			(res['errs'][1]).should.have.property('campo', 'email');
			(res['errs'][1]).should.have.property('mensagem', 'Digite o email');
			(res['errs'][2]).should.have.property('campo', 'senha');
			(res['errs'][2]).should.have.property('mensagem', 'Digite a senha');
			done();
		});
		describe('NOME', function(done){
			it('Validando o campo nome com nulos', function(done){
				var tests = [
					null, undefined, "", "          "
				];
				var expect = [
					null, undefined, "", ""
				];
				var next = function(){};
				tests.forEach(function(test, index){
					req.body.nome = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(3);
					(res['errs'][0]).should.have.property('campo', 'nome');
					(res['errs'][0]).should.have.property('mensagem', 'Digite o nome');
					(req.body.nome === expect[index]).should.equal(true);
					before();
				})
				done();
			});
			it('Validando o campo nome inferior de 5 caracteres', function(done){
				var tests = [
					"Ito", "  Ana        ", "Jaca"
				];
				var expect = [
					"Ito", "Ana", "Jaca"
				];
				var next = function(){};
				tests.forEach(function(test, index){
					req.body.nome = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(3);
					(res['errs'][0]).should.have.property('campo', 'nome');
					(res['errs'][0]).should.have.property('mensagem', 'Nome inferior de 5 caracteres');
					(req.body.nome === expect[index]).should.equal(true);
					before();
				})
				done();
			});
			it('Validando o campo nome valido', function(done){
				var next = function(){};
				var tests = [
					"Edson Akira Ito", "    Edson Akira Ito    "	
				];
				tests.forEach(function(test, index){
					req.body.nome = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(2);
					(res['errs'][0]).should.have.property('campo', 'email');
					(res['errs'][0]).should.have.property('mensagem', 'Digite o email');
					(res['errs'][1]).should.have.property('campo', 'senha');
					(res['errs'][1]).should.have.property('mensagem', 'Digite a senha');
					(req.body.nome === "Edson Akira Ito").should.equal(true);
					before();
				})
				done();
			});
			it('Validando o "escape" campo nome', function(done){
				var next = function(){};
				var tests = [
					"</dsate input", "' or '1"	
				];
				var expect = [
					"&lt;&#x2F;dsate input", "&#x27; or &#x27;1"	
				];
				tests.forEach(function(test, index){
					req.body.nome = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(2);
					(res['errs'][0]).should.have.property('campo', 'email');
					(res['errs'][0]).should.have.property('mensagem', 'Digite o email');
					(res['errs'][1]).should.have.property('campo', 'senha');
					(res['errs'][1]).should.have.property('mensagem', 'Digite a senha');
					(req.body.nome === expect[index]).should.equal(true);
					before();
				})
				done();
			});
		});
		describe('EMAIL', function(done){
			it('Validando o campo email com nulos', function(done){
				var tests = [
					null, undefined, "", "          "
				];
				var expect = [
					null, undefined, "", ""
				];
				var next = function(){};
				tests.forEach(function(test, index){
					req.body.email = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(3);
					(res['errs'][1]).should.have.property('campo', 'email');
					(res['errs'][1]).should.have.property('mensagem', 'Digite o email');
					(req.body.email === expect[index]).should.equal(true);
					before();
				})
				done();
			});
			it('Validando o campo email invalido', function(done){
				var tests = [
					"edson", "edson.akira", "edson.akira@", "edson.akira@ito", "edson.akira@ito."
				];
				var next = function(){};
				tests.forEach(function(test, index){
					req.body.email = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(3);
					(res['errs'][1]).should.have.property('campo', 'email');
					(res['errs'][1]).should.have.property('mensagem', 'Email invalido');
					before();
				})
				done();		
			});
			it('Validando o campo email normalizeEmail', function(done){
				var tests = [
					"edson.akira@ito.com", "edson.akira21+@gmail.com", "edson.deakira21+tag@gmail.com", "edson.tagakira21+@hotmail.com"
				];
				var expect = [
					"edson.akira@ito.com", "edsonakira21@gmail.com", "edsondeakira21@gmail.com", "edson.tagakira21+@hotmail.com"
				];
				var next = function(){};
				tests.forEach(function(test, index){
					req.body.email = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(2);
					(res['errs'][1]).should.have.not.property('campo', 'email');
					(res['errs'][1]).should.have.not.property('mensagem', 'Email invalido');
					(req.body.email === expect[index]).should.equal(true);
					before();
				})
				done();		
			});
		});
		describe('SENHA', function(done){
			it('Validando o campo senha com nulos', function(done){
				var tests = [
					null, undefined, "", "          "
				];
				var expect = [
					null, undefined, "", ""
				];
				var next = function(){};
				tests.forEach(function(test, index){
					req.body.senha = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(3);
					(res['errs'][2]).should.be.type('object');
					(res['errs'][2]).should.have.property('campo', 'senha');
					(res['errs'][2]).should.have.property('mensagem', 'Digite a senha');
					(req.body.senha === expect[index]).should.equal(true);
					before();
				})
				done();
			});
			it('Validando o campo senha de tamanho invalido. (de 5 á 12 caracteres)', function(done){
				var tests = [
					"1234", "4es74i57df58e", "fdss", "anamarianaabana"
				];
				var next = function(){};
				tests.forEach(function(test, index){
					req.body.senha = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(3);
					(res['errs'][2]).should.be.type('object');
					(res['errs'][2]).should.have.property('campo', 'senha');
					(res['errs'][2]).should.have.property('mensagem', 'Senha de tamanho invalido. (de 5 á 12 caracteres)');
					before();
				})
				done();
			});
			it('Validando o campo senha valida', function(done){
				var tests = [
					"12345", "4es74i57df58", "rianaabana"
				];
				var next = function(){};
				tests.forEach(function(test, index){
					req.body.senha = test;
					validation.cadastrar(req, res, next);
					(res['stat']).should.be.exactly(400);
					(res['errs']).should.have.length(2);
					(res['errs']).should.be.type('object');
					(res['errs'][0]).should.have.not.properties({
					    campo: 'senha',
					    mensagem: 'Senha de tamanho invalido. (de 5 á 12 caracteres)'
					});
					(res['errs'][1]).should.have.not.properties({
					    campo: 'senha',
					    mensagem: 'Senha de tamanho invalido. (de 5 á 12 caracteres)'
					});
					before();
				})
				done();
			});
		});
	});

	describe('Routes', function(done){
		it ('Validando a montagem do Model User', function(done){
			var User = routes.__get__('User');
			routes.__set__('User', function(doc, fields, skipId){
				model = User.call(this, doc, fields, skipId);
				model.save = function(callback){
					callback(null);
				}
				return model;
			});

			res.json = function(json){
				(json).should.be.type("object");
				(json).should.have.properties('name', 'password', 'email')
				done();
			}
			res.status = function(status){
				return {
					send: function(data){
						done("Error de saida");
					}
				}
			}

			routes.cadastrar(req, res);
		});
	});
	
});