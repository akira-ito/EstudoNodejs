module.exports = function(express){
    var router = express.Router();

    router.post('/ims', function(req, res){
      var trancode = req.body.trancode;
      res.json(trancode+" - resposta")
    });

    return router;
}
