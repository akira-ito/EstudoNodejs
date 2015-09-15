var request = require('supertest');
var expect = require('expect');

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
		it('Fazendo uma requisição com os retornos da validação 400 GET /cadastrar', function(done){
			request('http://localhost:8080/addOn/crudUser')
				.post('/cadastrar')
				.send({})
				.expect('Content-Type', "application/json; charset=utf-8")
				.end(function(err, res){
					if (err)
						return done(err);
					var body = res.body;
					expect(body).toExist().toBeA("array");
					expect(body.length).toEqual(3);
					expect(body[0]).toExist().toBeA("object").toEqual({"campo":"nome","mensagem":"Digite o nome"});
					expect(body[1]).toExist().toBeA("object").toEqual({"campo":"email","mensagem":"Digite o email"});
					expect(body[2]).toExist().toBeA("object").toEqual({"campo":"senha","mensagem":"Digite a senha"});
					done();
				})
		})
		it('Nome: Nome invalido 400 GET /cadastrar', function(done){
			var usuario = [
				null,
				undefined,
				"",
				"         "
			]

			usuario.forEach(function(usu, index){
				request('http://localhost:8080/addOn/crudUser')
					.post('/cadastrar')
					.send({
						nome: usu
					})
					.expect('Content-Type', "application/json; charset=utf-8")
					.end(function(err, res){
						if (err)
							return done(err);
						var body = res.body;
						expect(body).toExist().toBeA("array");
						expect(body.length).toEqual(3);
						expect(body[0]).toExist().toBeA("object").toEqual({"campo":"nome","mensagem":"Digite o nome"});
						expect(body[1]).toExist().toBeA("object").toEqual({"campo":"email","mensagem":"Digite o email"});
						expect(body[2]).toExist().toBeA("object").toEqual({"campo":"senha","mensagem":"Digite a senha"});
						if (usuario.length == index+1){
							done();
						}
					})
			})
		})
		it('Nome: Nome inferior de 5 caracteres 400 GET /cadastrar', function(done){
			var usuario = [
				"Ito",
				"Akir",
				" a  "
			]

			usuario.forEach(function(usu, index){
				request('http://localhost:8080/addOn/crudUser')
					.post('/cadastrar')
					.send({
						nome: usu
					})
					.expect('Content-Type', "application/json; charset=utf-8")
					.end(function(err, res){
						if (err)
							return done(err);
						var body = res.body;
						expect(body).toExist().toBeA("array");
						expect(body.length).toEqual(3);
						expect(body[0]).toExist().toBeA("object").toEqual({"campo":"nome","mensagem":"Nome inferior de 5 caracteres"});
						expect(body[1]).toExist().toBeA("object").toEqual({"campo":"email","mensagem":"Digite o email"});
						expect(body[2]).toExist().toBeA("object").toEqual({"campo":"senha","mensagem":"Digite a senha"});
						if (usuario.length == index+1){
							done();
						}
					})
			})
		})
		it('Nome: Nome valido 400 GET /cadastrar', function(done){
			var usuario = [
				"Edson",
				"Akira"
			]

			usuario.forEach(function(usu, index){
				request('http://localhost:8080/addOn/crudUser')
					.post('/cadastrar')
					.send({
						nome: usu
					})
					.expect('Content-Type', "application/json; charset=utf-8")
					.end(function(err, res){
						if (err)
							return done(err);
						var body = res.body;
						expect(body).toExist().toBeA("array");
						expect(body.length).toEqual(2);
						expect(body[0]).toExist().toBeA("object").toEqual({"campo":"email","mensagem":"Digite o email"});
						expect(body[1]).toExist().toBeA("object").toEqual({"campo":"senha","mensagem":"Digite a senha"});
						if (usuario.length == index+1){
							done();
						}
					})
			})
		})
		it('Email: Digite o email 400 GET /cadastrar', function(done){
			var emails = [
				null,
				undefined,
				"",
				"         "
			]

			emails.forEach(function(email, index){
				request('http://localhost:8080/addOn/crudUser')
					.post('/cadastrar')
					.send({
						email: email
					})
					.expect('Content-Type', "application/json; charset=utf-8")
					.end(function(err, res){
						if (err)
							return done(err);
						var body = res.body;
						expect(body).toExist().toBeA("array");
						expect(body.length).toEqual(3);
						expect(body[0]).toExist().toBeA("object").toEqual({"campo":"nome","mensagem":"Digite o nome"});
						expect(body[1]).toExist().toBeA("object").toEqual({"campo":"email","mensagem":"Digite o email"});
						expect(body[2]).toExist().toBeA("object").toEqual({"campo":"senha","mensagem":"Digite a senha"});
						if (emails.length == index+1){
							done();
						}
					})
			})
		})
		it('Email: Email invalido 400 GET /cadastrar', function(done){
			var emails = [
				"edson",
				"edson.akira",
				"edson.akira@",
				"edson.akira@gmail",
				"edson.akira@gmail.",
			]

			emails.forEach(function(email, index){
				request('http://localhost:8080/addOn/crudUser')
					.post('/cadastrar')
					.send({
						email: email
					})
					.expect('Content-Type', "application/json; charset=utf-8")
					.end(function(err, res){
						if (err)
							return done(err);
						var body = res.body;
						expect(body).toExist().toBeA("array");
						expect(body.length).toEqual(3);
						expect(body[0]).toExist().toBeA("object").toEqual({"campo":"nome","mensagem":"Digite o nome"});
						expect(body[1]).toExist().toBeA("object").toEqual({"campo":"email","mensagem":"Email invalido"});
						expect(body[2]).toExist().toBeA("object").toEqual({"campo":"senha","mensagem":"Digite a senha"});
						if (emails.length == index+1){
							done();
						}
					})
			})
		})
		it('Email: Email invalido 400 GET /cadastrar', function(done){
			var emails = [
				"edson.akira@gmail.com",
				"edson.akira123@gmail.com",
				"edson.akira1+_23@hotmail.com"
			]

			emails.forEach(function(email, index){
				request('http://localhost:8080/addOn/crudUser')
					.post('/cadastrar')
					.send({
						email: email
					})
					.expect('Content-Type', "application/json; charset=utf-8")
					.end(function(err, res){
						if (err)
							return done(err);
						var body = res.body;
						expect(body).toExist().toBeA("array");
						expect(body.length).toEqual(2);
						expect(body[0]).toExist().toBeA("object").toEqual({"campo":"nome","mensagem":"Digite o nome"});
						expect(body[1]).toExist().toBeA("object").toEqual({"campo":"senha","mensagem":"Digite a senha"});
						if (emails.length == index+1){
							done();
						}
					})
			})
		})
		it('Senha: Senha invalido 400 GET /cadastrar', function(done){
			var emails = [
				null,
				undefined,
				"",
				"             "
			]

			emails.forEach(function(email, index){
				request('http://localhost:8080/addOn/crudUser')
					.post('/cadastrar')
					.send({
						email: email
					})
					.expect('Content-Type', "application/json; charset=utf-8")
					.end(function(err, res){
						if (err)
							return done(err);
						var body = res.body;
						expect(body).toExist().toBeA("array");
						expect(body.length).toEqual(3);
						expect(body[0]).toExist().toBeA("object").toEqual({"campo":"nome","mensagem":"Digite o nome"});
						expect(body[1]).toExist().toBeA("object").toEqual({"campo":"email","mensagem":"Digite o email"});
						expect(body[2]).toExist().toBeA("object").toEqual({"campo":"senha","mensagem":"Digite a senha"});
						if (emails.length == index+1){
							done();
						}
					})
			})
		})
	})
});
