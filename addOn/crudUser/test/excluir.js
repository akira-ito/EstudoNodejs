var should = require('should');
var rewire  = require('rewire');
var routes = rewire('../routes');
var validation = require('../validation');
var utils = require('../../utils.js');
var req, res, before;

describe('Testando o Middleware /excluir', function(done){
	describe('Validation', function(done){
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

		it ('Validando o id inválido.', function(done){
			req.params.id = null;
			validation.excluir(req, res, function(){});

			(res['stat']).should.be.a.Number;
			(res['stat']).should.be.exactly(400);
			(res['errs']).should.have.length(1);
			(res['errs'][0]).should.have.property('campo', 'id');
			(res['errs'][0]).should.have.property('mensagem', 'Id inválido.');

			done();
		});
	});

	describe('Routes', function(done){
		var funct, req, User;
		beforeEach(function(){
			req = {'body': {}, 'params': {}, 'query': {} };
			User = routes.__get__('User');
		});

		it ('Validando a montagem do id passado', function(done){
			req.params.id = "560449625f0ba30437655e4e";
			User["findById"] = function(id, callback){
				should.exist(id);
				(id).should.be.a.String;
				(id).should.be.exactly(req.params.id);

				should.exist(callback);
				(callback).should.be.a.Function;

				done();
			};
			routes().excluir(req, function(){});
		});
		it ('Validando o status 500 de erro', function(done){
			req.params.id = "560449625f0ba30437655e4e";
			User["findById"] = function(id, callback){
				should.exist(id);
				(id).should.be.a.String;
				(id).should.be.exactly(req.params.id);

				should.exist(callback);
				(callback).should.be.a.Function;

				callback(new Error('Erro ao realizar a busca.'), null);
			};

			var res = { 
				status: function(statu){
					return {
						send: function(body){
							(statu).should.be.a.Number;
							(statu).should.be.exactly(500);;

							(body).should.be.a.Error;
							(body).should.eql(new Error('Erro ao realizar a busca.'));

							done();
						}
					}
				}
			} 
			routes().excluir(req, res);
		});
		it ('Validando o status 400 de Usuario nao encontrado', function(done){
			req.params.id = "560449625f0ba30437655e4e";
			User["findById"] = function(id, callback){
				should.exist(id);
				(id).should.be.a.String;
				(id).should.be.exactly(req.params.id);

				should.exist(callback);
				(callback).should.be.a.Function;

				callback(null, null);
			};

			var res = { 
				status: function(statu){
					return {
						send: function(body){
							(statu).should.be.a.Number;
							(statu).should.be.exactly(400);;

							(body).should.be.a.Error;
							(body).should.eql("Usuario nao cadastrado.");

							done();
						}
					}
				}
			} 
			routes().excluir(req, res);
		});
		it ('Validando o status 200 de Exclusão com sucesso.', function(done){
			req.params.id = "560449625f0ba30437655e4e";
			User["findById"] = function(id, callback){
				should.exist(id);
				(id).should.be.a.String;
				(id).should.be.exactly(req.params.id);

				should.exist(callback);
				(callback).should.be.a.Function;

				var usuario = {
					remove: function(callback){
						callback();
					}
				}
				callback(null, usuario);
			};

			var res = { 
				send: function(body){
					should.exist(body);
					(body).should.be.a.String;
					(body).should.eql("Usuario excluido com sucesso.");

					done();
				}
			} 
			routes().excluir(req, res);
		});
	});
})