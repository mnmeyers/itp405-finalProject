var express = require('express');
//var q = require('q');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
//var Sequelize = require('sequelize');
//var sequelize = require('./config/sequelize');
//var Playlist = require('./models/Playlist');
var PlaylistController = require('./controllers/PlaylistController');
var UserController = require('./controllers/UserController');
var User = require('./models/User');
var Playlist = require('./models/Playlist');



var app = express();


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true, maxAge:3600000}));
app.use('/bower_components',  function(){
  //console.log("hello i got hit");
});//express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
    //console.log('helooooooooooo', req.session.user_id);
    User.find(req.session.user_id).then(function(user){
        //console.log('ANDREW ROCKS MY SOCKS', user);
        console.log('profile view rendered');
        res.render('profile', {
            title: 'Profile',
            user: user
        });
    });

});

app.post('/profile', function(req, res){
    if(!req.session.user_id){
        return res.redirect('/login');
    }
    User.update({
        email: req.email,
        description: req.query.description,
        facebook: req.query.facebook,
        twitter: req.query.twitter
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(){
    console.log('what is happening', req.email);
    User.find(req.session.user_id).then(function(user){
        res.render('profile', {
            title: 'Profile',
            user: user
        });
    });

    });

});

//app.post('/profile', UserController.users);

//this didn't work
//app.post('/profile', function(req, res){
//    if(!req.session.user_id){
//        return res.redirect('/login');
//    }
//    User.find(req.session.user_id)
//        .then(function(){
//            User.update({
//                email: req.email,
//                description: req.query.description,
//                facebook: req.query.facebook,
//                twitter: req.query.twitter
//            }, {
//                where: {
//                    id: req.body.id
//                }
//            })
//                .then(function(user){
//                    res.render('profile', {
//                        title: 'Profile',
//                        user: user
//                    });
//                });
//    });
//});

app.get('/login', function(req, res){
    console.log('login view rendered');
    res.render('login', {
        title: 'Login'
    });
});

//app.post('/login', function(req, res){
//    var user_id = req.body.id;//took out .id
//    //take out the other user.findorcreate in userController
//    User.findOrCreate({
//        where: {
//            id: req.body.id
//        }
//        //first_name: req.body.first_name,
//        //last_name: req.body.last_name
//        //wouldn't this overwrite every time you log in? so even if you changed ur fname
//        //and lname it would still revert back once you log in again
//    }).spread(function(user, results){
//       console.log("\n\n\nFOUNDA USER:", user);
//        req.session.user_id = user_id;
//        res.type('json');
//        res.status(200).send({message: "humm hum hum"});
//        //res.write()
//    });
//});

app.post('/login', UserController.users);
//app.post('/users/:id', UserController.users);

app.get('/playlist', function(req, res){
    if(!req.session.user_id){
        return res.redirect('/login');
    }
    console.log('playlist view rendered');
    res.render('createPlaylist', {
        title: 'Create Playlist'
    });
});

app.post('/playlist', function(req, res){
    if(!req.session.user_id){
        return res.redirect('/login');
    }
    console.log('playlist view rendered');
    Playlist.create({
        playlist_url: {
            like: req.query.playlist_url
        },

        mood_name: {
            like: req.query.mood_name
        },
        playlist_name: {
            like: req.query.playlist_name
        }

    }).then(function() {
        // you can now access the newly created task via the variable task
        res.render('createPlaylist');
    })
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
