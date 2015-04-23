var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = sequelize.define('playlist', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER
    },
    playlist_name: {
        field: 'playlist_name',
        type: Sequelize.STRING
    },
    playlist_url: {
        field: 'playlist_url',
        type: Sequelize.STRING
    },
    moods_id: {
        field: 'moods_id',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});
//sequelize.query('select playlist_name, playlists.id, mood_name from playlists, moods where moods.id = playlists.moods_id and mood_name like ' + '%' + req.query.mood_name + '%',
//    { type: sequelize.QueryTypes.SELECT }).then(function (results) {
//   console.log(results);
//});
module.exports = Playlist;