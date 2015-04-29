var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var PlaylistController = require('./controllers/PlaylistController');
var UserController = require('./controllers/UserController');
var User = require('./models/User');
var Playlist = require('./models/Playlist');
var Mood = require('./models/Mood');
var sessionStore = new session.MemoryStore;

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public', {maxAge: 21600000}));

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
    maxAge:3600000}));
app.use('/bower_components',  function(){});//breaks without this empty function...

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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
    delete req.session.user_id;
    res.redirect(301, "/");
});

<<<<<<< HEAD
app.post('/playlist', function(req, res){
    if(!req.session.user_id){
        return res.redirect(301, '/login');
    } else {
        req.session.sessionFlash = {
            type: 'success',
            message: 'You have successfully created a playlist!'
        };
        res.redirect(301, '/playlist');
    }
    Playlist.create({
        playlist_url: req.body.playlist_url,
        playlist_name: req.body.playlist_name
       // mood_id: Mood.id
    });
    Mood.findOrCreate({
        mood_name: req.body.mood_name,
        where: {
            mood_name: req.body.mood_name
        }

    }).then(function() {
        // you can now access the newly created task via the variable task
        res.render('createPlaylist',{
        });
    })
});
=======
app.get('/profile', UserController.get);
>>>>>>> 3f6bd4e... cleaning up started

app.post('/profile', UserController.update);

app.get('/playlist', PlaylistController.view);

app.post('/playlist', PlaylistController.create);

app.get('/playlists', PlaylistController.playlists);

//on port 3000
app.listen(3000, function(){
   console.log('listening on localhost:3000');
});
module.exports = app;
