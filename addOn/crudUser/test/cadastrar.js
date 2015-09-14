var request = require('supertest')

describe('Testar o CrudUser cadastrar', function(){
	describe('via GET', function(done){
		it('Fazendo uma requisição 200 GET cadastrar', function(done){
			request('http://localhost:8080/addOn/crudUser')
				.get('cadastrar')
				.expect('Content-Type', "text/html; charset=utf-8")
			  .expect(404, done);
		})
		it('Fazendo uma requisição 404 GET /cadastrar', function(done){
			request('http://localhost:8080/addOn/crudUser')
				.get('/cadastrar')
				.expect('Content-Type', "text/html; charset=utf-8")
			  .expect(200, done);
		})
	})

	describe('via POST', function(done){
		it('Fazendo uma requisição com erro de validação 400 POST /cadastrar', function(done){
			request('http://localhost:8080/addOn/crudUser')
				.post('/cadastrar')
				.expect('Content-Type', "application/json; charset=utf-8")
			  .expect(400, done);
		})
		it('Fazendo uma requisição 404 GET /cadastrar', function(done){
			var user = {name: 'Bob'};
			request('http://localhost:8080/addOn/crudUser')
				.post('/cadastrar')
				.send(user)
				.expect('"Nome é obrigatorio"', done);
		})
	
	})
});