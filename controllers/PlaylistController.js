/**
 * Created by mmeyers on 4/16/15.
 */
var Playlist = require('./../models/Playlist');
var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Mood = require('./../models/Mood');
module.exports = {
    playlists: function(req, res, err) {
        Playlist.sequelize.query('select playlist_name, playlists.id, playlist_url, mood_name from playlists, moods where moods.id = playlists.mood_id and mood_name like ' + '\'' + '%'  + req.query.mood_name + '%' + '\'',
            { type: sequelize.QueryTypes.SELECT }
        ).then(function(results){
                res.render('playlists', {
                    playlists: results
                });
            }, function(err){
                res.render();
            });
    },

    create: function(req, res) {
        if(!req.session.user_id){
            return res.redirect(301, '/login');
        }


        Mood.findOrCreate({
            mood_name: req.body.mood_name,
            where: {
                mood_name: req.body.mood_name
            }
        }).spread(function(mood, created) {
            console.log("\n\n MOOOOOOOOD:");
            console.log(mood);
            console.log("\n\n MOOD ID>");
            console.log(mood.id);

            Playlist.create({
                playlist_url: req.body.playlist_url,
                playlist_name: req.body.playlist_name,
                mood_id: mood.id
            });
            req.session.sessionFlash = {
                type: 'success',
                message: 'You successfully created a playlist!!'
            };
            res.redirect(301, '/playlist');
        }).fail(function(error){


            console.log('\n\n\n\n\n yayyyyyy we fucking faillled \n\n\n\n\n\n');
            console.log(error);
            req.session.sessionFlash = {
                type: 'danger',
                message: 'You must fill out all the fields!'
            };
            res.redirect(301, '/playlist');

        });
    }
};