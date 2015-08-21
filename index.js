var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var indexRouter = require('./routes/index')(express);
var trancodeRouter = require('./routes/trancode')(express);
var codigoBarraRouter = require('./routes/codigoBarra')(express);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/bower_components/'));
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(indexRouter)
.use(trancodeRouter)
.use('/codigoBarra', codigoBarraRouter);

app.use(function(req, res, next){
	res.status(404);
	res.render('error', {err: new Error('Not Found')});
}).use(function(err, req, res, next){
	res.status(503);
	res.render('error', {err: err});
})

app.listen(8080, function(){
	console.log('subiu!');
})