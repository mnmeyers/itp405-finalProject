var express = require('express');
var q = require('q');
var ejs = require('ejs');
var User = require('./models/User');

//take this out later

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  function(){
  //console.log("hello i got hit");
});//express.static(__dirname + '/bower_components'));

//routes:
app.get('/', function(req, res){
   console.log('index view rendered');
    //console.log('michal', req);
    res.render('index', {
        title: 'Home'
    });
});

app.get('/test', function(req, res){
    console.log('test view rendered');
    res.render('test', {
        title: 'Test'
    });
});



//on port 3000
app.listen(3000, function(){
   console.log('listening on localhost:3000');
});
