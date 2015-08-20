module.exports = function(express){
	var router = express.Router();
	var connetors = [
		{id: 1, name: 'IMS'},
		{id: 2, name: 'PJTCPIMS'},
		{id: 3, name: 'QT'},
		{id: 4, name: 'GRBE'}
	];

	router.get('/', function(req, res){
		res.render('index');
	});

	router.get('/trancode', function(req, res){
		res.render('trancode/trancode', {connetors: connetors});
	})


	return router;
}