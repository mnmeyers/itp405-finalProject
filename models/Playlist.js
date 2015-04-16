var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = sequelize.define('playlist', {
    playlist_name: {
        field: 'playlist_name',
        type: Sequelize.STRING
    }
    //mood_name: {
    //    field: 'mood_name',
    //    type: Sequelize.STRING
    //}
}, {
    timestamps: false
});
//sequelize.query('select playlist_name, playlists.id, mood_name from playlists, moods where moods.id = playlists.moods_id and mood_name like ' + '%' + req.query.mood_name + '%',
//    { type: sequelize.QueryTypes.SELECT }).then(function (results) {
//   console.log(results);
//});
module.exports = Playlist;