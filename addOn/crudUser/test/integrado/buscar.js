var request = require('supertest');
var expect = require('expect');
var should = require('should');
var mongoose = require('mongoose');
var async = require('async');
var http = "http://localhost:8080/addOn/crudUser";



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
		var found, db, User;
		before(function(done) {
			db = mongoose.connect('mongodb://localhost/crudUser');
			User = require('../../model/index')

			async.series([
				function(callback){
					User.find({}, function(err, users){
						callback(err, users)
					})
				},
				function(callback){
					User.collection.remove(function(){
						callback();
					})
				}],function(err, res){
					if (err) 
						return done(err);
					found = res[0];
					console.log('found', found);
					done();
				}
			)
		});

		it('Fazendo uma requisição 200 POST /buscar', function(done){
			request(http)
				.post('/buscar')
				.expect('Content-Type', "application/json; charset=utf-8")
			  .expect(200, done);
		})
		it('Fazendo uma requisição com os retornos da validação 400 POST /buscar', function(done){
			request(http)
				.post('/buscar')
				.send({})
				.expect('Content-Type', "application/json; charset=utf-8")
				.end(function(err, res){
					if (err)
						return done(err);
					var body = res.body;
					expect(body).toExist().toBeA("array");
					expect(body.length).toEqual(0);
					done();
				})
		});

		after(function(done) {
			var User = require('../../model/index');
			console.log('voaltando', found);
			db.get('User').insert(found, function(err, users){
				console.log(err, users, found);
				done();
			})
			db.close();
		});
	})
});
