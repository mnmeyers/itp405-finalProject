/**
 * Created by mmeyers on 4/16/15.
 */
var Playlist = require('./../models/Playlist');
var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
module.exports = {
    playlists: function(req, res) {
        Playlist.sequelize.query('select playlist_name, playlists.id, mood_name from playlists, moods where moods.id = playlists.moods_id and mood_name like ' + '\'' + '%'  + req.query.mood_name + '%' + '\'',
            { type: sequelize.QueryTypes.SELECT }).then(function (results) {
                console.log(results);
            }).then(function(results){
                res.render('playlists', {
                    playlists: results
                });
            });
    },
    create: function(req, res) {

    }
};