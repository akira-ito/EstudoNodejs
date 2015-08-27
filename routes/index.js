var config = require('./../config/local.json');
module.exports = function(express){
	var router = express.Router();

	router.get('/', function(req, res){
		res.render('index');
	});

	router.get('/trancode', function(req, res){
		console.log(config,Object.keys(config.conectores));
		res.render('trancode/trancode', {connetors: Object.keys(config.conectores)});
	})


	return router;
}