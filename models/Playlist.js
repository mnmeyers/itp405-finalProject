var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = sequelize.define('playlist', {
    playlist_name: {
        field: 'playlist_name',
        type: Sequelize.STRING,
        validate: {
            allowNull: false,
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    playlist_url: {
        field: 'playlist_url',
        type: Sequelize.STRING,
        validate: {
            allowNull: false,
            notEmpty: true,
            notContains: 'script',
            len: [185,195]
        }
    },
    mood_id: {
        field: 'mood_id',
        type: Sequelize.INTEGER,
        references: 'moods', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
    }
    //mood_id: {
    //    field: 'mood_id',
    //    type: Sequelize.INTEGER
    //}
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
//console.log(Playlist);
module.exports = Playlist;