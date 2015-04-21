var express = require('express');
var q = require('q');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
//var Sequelize = require('sequelize');
//var sequelize = require('./config/sequelize');
//var Playlist = require('./models/Playlist');
var PlaylistController = require('./controllers/PlaylistController');
var UserController = require('./controllers/UserController');
var User = require('./models/User');



var app = express();


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true}));
app.use('/bower_components',  function(){
  //console.log("hello i got hit");
});//express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());

//routes:
app.get('/', function(req, res){
   console.log('index view rendered');
    //console.log('michal', req);
    console.log("\n\n\n\nSESSION IS WORKING????:", req.session.user_id);
    //if(!req.session.user_id){
    //I want this page to be publicly available.
    //    return res.redirect('/login');
    //}
    res.render('index', {
        title: 'Home'
    });
});

app.get('/logout', function(req, res){
    delete req.session.user_id;
    res.redirect("/login");
});

app.get('/profile', function(req, res){
    if(!req.session.user_id){
        return res.redirect('/login');
    }
    console.log('helooooooooooo', req.session.user_id);
    User.find(req.session.user_id).then(function(user){
        console.log('ANDREW ROCKS MY SOCKS', user);
        console.log('profile view rendered');
        res.render('profile', {
            title: 'Profile',
            user: user
        });
    });

});

app.get('/login', function(req, res){
    console.log('login view rendered');
    res.render('login', {
        title: 'Login'
    });
});

app.post('/login', function(req, res){
    var user_id = req.body.id;
    //take out the other user.findorcreate in userController
    User.findOrCreate({
        where: {
            id: req.body.id
        }
    }).spread(function(user, results){
       console.log("\n\n\nFOUNDA USER:", user);
        req.session.user_id = user_id;
        res.type('json');
        res.status(200).send({message: "humm hum hum"});
        //res.write()
    });
});

app.post('/users/:id', UserController.users);

app.get('/playlist', function(req, res){
    if(!req.session.user_id){
        return res.redirect('/login');
    }
    console.log('playlist view rendered');
    res.render('createPlaylist', {
        title: 'Create Playlist'
    });
});


app.get('/callback', function(req, res){
    console.log('callback view rendered');
    res.render('callback', {
        title: 'callback'
    });
});

app.get('/playlists', PlaylistController.playlists);



//on port 3000
app.listen(3000, function(){
   console.log('listening on localhost:3000');
});
