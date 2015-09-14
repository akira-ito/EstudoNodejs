var request = require('supertest')

describe('Testando o CrudUser index', function(done){
	it('Fazendo uma requisição errada 404 GET notFound', function(done){
		request('http://localhost:8080/addOn/crudUser')
		  .get('notFound')
		  .expect(404)
		  .end(function(err, res){
		    if (err) done(err);
		    else done();
		  });
	})
	it('Fazendo uma requisição errada 404 GET /testando', function(done){
		request('http://localhost:8080/addOn/crudUser')
		  .get('/testando')
		  .expect(404, 'Pagina não encontrado!', done);
	})
	it('Fazendo uma requisição 200 GET /', function(done){
		request('http://localhost:8080/addOn/crudUser')
		  .get('/')
		  .expect(200)
		  .end(function(err, res){
		    if (err) done(err);
		    else done();
		  });
	})	
	it('Fazendo uma requisição 200 Content-Type GET / ', function(done){
	request('http://localhost:8080/addOn/crudUser')
	  .get('/')
		.expect('Content-Type', "text/html; charset=utf-8")
		.expect(200, done);
	})	
});