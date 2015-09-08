var request = require('request');
var config = require('./../config/local.json');

module.exports = function(express){
	var router = express.Router();

	router.get('/', function(req, res){
		res.render('trancode/trancode', {connetors: Object.keys(config.conectores)});
	})

	router.post('/request', function(req, res){
		var conector = req.body.conector
		var envio = req.body.envio
		var resposta = req.body.resposta
		var connetors = Object.keys(config.conectores);

		if (resposta){
        	res.json({form: {conector: conector, connetors: connetors, envio: envio, resposta: resposta}});
		}else{
			var data = {
				"trancode": envio
			};
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
	        request.post(config.conectores[conector], { json: data }, function(err, resp, body) {
						console.log(resp, body, err);
	        	if (err){
	        		return res.json(err);
	        	}
	        	res.json({form:{conector: conector, envio: envio, resposta: body, connetors: connetors}});
	        });
		}
	});

	return router;
}
