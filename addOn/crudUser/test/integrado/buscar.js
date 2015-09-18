var request = require('supertest');
var expect = require('expect');
var should = require('should');
var http = "http://localhost:8080/addOn/crudUser";
var mongoose = require('mongoose');
var config = require('../../config')();
var User = require('../../model').User;
var async = require('async');
var db, criarUsuario;

// verificando variavel de ambiente
before(function(done){
	var env = process.env.NODE_ENV;
	if (env != "TEST"){
		throw new Error("Configure a variavel de ambiente para TEST");
	}else{ //conectando ambiente de teste
		db = mongoose.connect(config.database['mongoose']);
		criarUsuario = function(user, callback){
			if (!user) return callback();
			var userNew = new User(user);
			userNew.save(callback)
		}
		done();
	}
})

describe('Testar o CrudUser buscar', function(){
	describe('via GET', function(done){
		it('Fazendo uma requisição 404 GET buscar', function(done){
			request(http)
				.get('buscar')
				.expect('Content-Type', "text/html; charset=utf-8")
			  .expect(404, done);
		})
		it('Fazendo uma requisição 200 GET /buscar', function(done){
			request(http)
				.get('/buscar')
				.expect('Content-Type', "text/html; charset=utf-8")
			  .expect(200, done);
		})
	})

	describe('via POST', function(done){
		it('Fazendo uma requisição 200 POST /buscar', function(done){
			request(http)
				.post('/buscar')
				.expect('Content-Type', "application/json; charset=utf-8")
			  	.expect(200, done);
		})
		it('Fazendo uma requisição que busca todos usuario 200 POST /buscar', function(done){
			var tests = [
				null, {name: 'edson akira'}, {name: 'mock II'}
			]
			var expects = {
				length: [0, 1, 2],	
				busca: [[], [{name: 'edson akira'}], [{name: 'edson akira'}, {name: 'mock II'}]]	

			}

			var qtdTest = 0;
			async.each(tests, function(test, callback){
				criarUsuario(test, function(err, res){
					if (err) 
						return callback(err);
					request(http)
					.post('/buscar')
					.send({})
					.expect('Content-Type', "application/json; charset=utf-8")
					.end(function(err, res){
						if (err) 
							return callback(err);
						var body = res.body;
						console.log('expects.length[qtdTest]', expects.length[qtdTest], body.length);
						expect(body).toExist();
						expect(body.length).toEqual(expects.length[qtdTest]);
						callback();
					})
					qtdTest++;
				});
			}, function(err){
				if(err) throw err;
				done();
			})

			
		});

	})
});

//dropando o banco de dados
after(function(done) {
	db.connection.db.dropDatabase(function(){
		db.connection.close(function(){
			done();
		});
	});
});
