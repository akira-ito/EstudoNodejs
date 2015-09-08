var express = require('express');
var router = express.Router();
var fs = require('fs');
var plugins = [];

module.exports = function(){
  fs.readdir('./addOn', function(err, files){
    files.forEach(function(file){
      if (fs.lstatSync('addOn/'+file).isDirectory()){
        var plugin = require('./'+file)(router);
        if (plugin.acrive){
          plugins.push({
            name: plugin.name,
            link: file
          });
          for (var key in plugin.router){
            var config = plugin.router[key];
            router[config.method]('/'+file+key, config.action);
          };
        }
      }
    })
  });

    return {
      plugins: plugins,
      router: router
    };
}
