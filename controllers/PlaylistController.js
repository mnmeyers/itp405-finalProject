/**
 * Created by mmeyers on 4/16/15.
 */
var Playlist = require('./../models/Playlist');
var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
module.exports = {
    playlists: function(req, res, err) {
        Playlist.sequelize.query('select playlist_name, playlists.id, playlist_url, mood_name from playlists, moods where moods.id = playlists.mood_id and mood_name like ' + '\'' + '%'  + req.query.mood_name + '%' + '\'',
            { type: sequelize.QueryTypes.SELECT })
            .then(function(results){
                console.log('\n\n\n\n\n fuck andrew', results);
                if(results){
                res.render('playlists', {
                    playlists: results
                });
                } else if(err) {
                    res.render('playlists', {
                        playlists: false
                    });
                    console.log('\n\n\n\n\n hellooo', playlists);
                }
            });
        //Playlist.create({
        //    playlist_url: {
        //        like: req.query.playlist_url
        //    },
        //
        //    mood_name: {
        //        like: req.query.mood_name
        //    },
        //    playlist_name: {
        //        like: req.query.playlist_name
        //    }
        //
        //   }).then(function() {
        //    // you can now access the newly created task via the variable task
        //    res.render('createPlaylists');
        //})
    },

    create: function(req, res) {

    }
};