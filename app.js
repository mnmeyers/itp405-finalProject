var express = require('express');
var q = require('q');
var ejs = require('ejs');
//var Sequelize = require('sequelize');
//var sequelize = require('./config/sequelize');
//var Playlist = require('./models/Playlist');
var PlaylistController = require('./controllers/PlaylistController');


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

app.get('/profile', function(req, res){
    console.log('profile view rendered');
    res.render('profile', {
        title: 'Profile'
    });
});

app.get('/playlist', function(req, res){
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

//app.get('/playlists', function(req, res){
//    console.log('playlists view rendered');
//    //Playlist.findAll({
//    //    where: {
//    //        mood_name: {
//    //            like: '%' + req.query.mood_name + '%'
//    //        },
//    //        playlist_name:{
//    //
//    //        }
//    //    }
//        //order: 'playlist_name ASC'
//    Playlist.sequelize.query('select playlist_name, playlists.id, mood_name from playlists, moods where moods.id = playlists.moods_id and mood_name like ' + '\'' + '%'  + req.query.mood_name + '%' + '\'',
//        { type: sequelize.QueryTypes.SELECT }).then(function (results) {
//            console.log(results);
//    }).then(function(results){
//        res.render('playlists', {
//            playlists: results
//        });
//    });
//});
app.get('/playlists', PlaylistController.playlists);



//on port 3000
app.listen(3000, function(){
   console.log('listening on localhost:3000');
});
