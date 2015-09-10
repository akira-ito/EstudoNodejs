var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var trancodeRouter = require('./routes/trancode')(express);
var codigoBarraRouter = require('./routes/codigoBarra')(express);
var testeRouter = require('./routes/teste')(express);
var addOn = require('./addOn')();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/bower_components/'));
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/addOn/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))

app.get('/', function(req, res){ res.render('index', {addOnPlugins: addOn.plugins}); })
.get('/render/:page/:session', function(req, res){

	console.log('page', req.params);
	res.render(req.params.page+'/'+req.params.session);
})
.use('/trancode', trancodeRouter)
.use('/codigoBarra', codigoBarraRouter)
.use('/teste', testeRouter)
.use('/mock', require('./mock')(express))
.use('/addOn', addOn.router);

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
