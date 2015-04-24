var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = sequelize.define('playlist', {
    playlist_name: {
        field: 'playlist_name',
        type: Sequelize.STRING
    },
    playlist_url: {
        field: 'playlist_url',
        type: Sequelize.STRING
    },
    mood_id: {
        field: 'mood_id',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    underscored: true
});
//Playlist.create({
//    playlist_url: playlist_url,
//    mood_name: mood_name,
//    playlist_name: playlist_name
//}).complete(function(err, playlist) {
//    if (err) {
//        // log error;
//    } else {
//        // Do stuff
//    }
//});

//sequelize.query('select playlist_name, playlists.id, mood_name from playlists, moods where moods.id = playlists.moods_id and mood_name like ' + '%' + req.query.mood_name + '%',
//    { type: sequelize.QueryTypes.SELECT }).then(function (results) {
//   console.log(results);
//});
console.log(Playlist);
module.exports = Playlist;