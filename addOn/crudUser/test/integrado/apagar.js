
var mongoose = require('mongoose');
var db;

describe('My test', function() {
  before(function(done) {
    //Another possibility is to check if mongoose.connection.readyState equals 1
    if (mongoose.connection.db) return done();
    console.log('nao');
    db = mongoose.connect('mongodb://localhost/test', done);
  });

  it("testando", function(done){
    console.log(db);
    done();
  })
});

// // You can put one ‘after()’ statement above all else that will run when all tests are finished
// after(function(done){
//   db.connection.db.dropDatabase(function(){
//     db.connection.close(function(){
//       done();
//     });
//   });


// });   