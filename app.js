var express = require('express');
var ejs = require('ejs');
//var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var flash = require('express-flash');
//var cookieParser = require('cookie-parser');
var PlaylistController = require('./controllers/PlaylistController');
var UserController = require('./controllers/UserController');
var User = require('./models/User');
//var FileStore = require('session-file-store')(session);

var app = express();

app.set('view engine', 'ejs');

//app.use(cookieParser('keyboard cat'));
var session = require('cookie-session');
app.use(session({
    keys: ['koala'],
    name: 'koala',
    httpOnly: false,
    maxAge: 21600000
}));
//caching:
app.use(express.static(__dirname + '/public', {maxAge: 21600000}));
//app.use(session({
//    secret: 'keyboard cat',
//    saveUninitialized: false,
//    resave: false
//}));

//var sessionStore = new session.MemoryStore;

app.use('/bower_components',  function(){});//breaks without this empty function...
app.use(logger("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
// Custom flash middleware
app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

//routes:
app.get('/', function(req, res){
    res.render('index', {
        title: 'Home'
    });
});

app.get('/callback', function(req, res){
    console.log('callback view rendered');
    res.render('callback', {
        title: 'callback'
    });
});

app.get('/login', function(req, res){
    console.log('login view rendered');
    res.render('login', {
        title: 'Login'
    });
});

app.post('/login', UserController.create);

app.get('/logout', function(req, res){
    res.redirect(301, "/");
});

app.get('/profile', UserController.get);

app.post('/profile', UserController.update);

app.get('/playlist', PlaylistController.view);

app.post('/playlist', PlaylistController.create);

app.get('/playlists', PlaylistController.playlists);

//on port 3000
app.listen(3000, function(){
   console.log('listening on localhost:3000');
});
module.exports = app;
