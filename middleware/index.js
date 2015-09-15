var Validator = require('validator');

var vall = {};
var err_validation = [];
var cache = [];
module.exports = function(){
  Validator.extend('isNotNull', function(str){
    return str;
  });

  Object.keys(Validator).forEach(function(key){
    vall[key] = function(){
      var res = Validator[key].apply(this, Array.prototype.concat(this.req[this.type][this.attr], Array.prototype.slice.call(arguments)));
      if (typeof res == "string" && this.req[this.type][this.attr]){
        this.req[this.type][this.attr] = res;
      }else if (cache.indexOf(this.attr) === -1 && !res){
        cache.push(this.attr);
        err_validation.push({
            "campo": this.attr,
            "mensagem": this.msg
        })
      }
      return vall;
    }
  });

  return {
    validator: validator
  }
}

// req.checkParam(attr, msg).isNull()
var validator = function(req, res, next){
  err_validation = [];
  cache = [];
  vall.req = req;
  function check(type){
    return function(attr, msg){
      vall.type = type;
      vall.attr = attr;
      vall.msg = msg;
      return vall;
    }
  }

  req.checkParam = check("params");
  req.checkBody = check("body");
  req.validationErrors = function(){
    return err_validation;
  }

  next();
}
