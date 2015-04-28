var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = sequelize.define('playlist', {
    playlist_name: {
        field: 'playlist_name',
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    playlist_url: {
        field: 'playlist_url',
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            notContains: 'script'
            //len: [185,195]
        }
    },
    mood_id: {
        field: 'mood_id',
        type: Sequelize.INTEGER,
        references: 'moods', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
    }
}, {
    timestamps: false,
    underscored: true
});
module.exports = Playlist;