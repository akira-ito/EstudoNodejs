var request = require('request');
var config = require('./../config/local.json');
module.exports = function(express){
	var router = express.Router();

	router.post('/request', function(req, res){
		var conector = req.body.conector
		var envio = req.body.envio
		var resposta = req.body.resposta
		console.log(envio, resposta, conector);

		if (resposta){
        	res.render('trancode/trancode', {conector: conector, envio: envio, resposta: resposta});
		}else{
			var data = {
				"trancode": envio
			};
	        request.post(config.conectores[conector], { json: data }, function(err, resp, body) {
	        	if (err){
	        		return res.render('error', {err: err});
	        	}
	        	res.render('trancode/trancode', {conector: conector, envio: envio, resposta: body, connetors: Object.keys(config.conectores)});
	        });
		}
	});

	return router;
}