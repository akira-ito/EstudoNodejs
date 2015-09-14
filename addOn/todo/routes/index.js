var Handlebars = require('handlebars')
var fs = require('fs');
var path = require('path');

module.exports.index = function(req, res, next){
	fs.readFile(path.join(__dirname, '../view/index.html'), 'utf-8', function(err, source){
		if (err){
			next(err);
		}else{
			var data = {};
			var template = Handlebars.compile(source);
			var html = template(data);
            res.set('Content-Type', 'text/html');
            res.send(html);
		}
	});
}


