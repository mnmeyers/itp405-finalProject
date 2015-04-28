var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = require('./Playlist');
var Mood = sequelize.define('mood', {
    mood_name: {
        field: 'mood_name',
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notContains: 'script'
        }
    }
}, {
    timestamps: false,
    underscored: true
});
Mood.hasOne(Playlist);
Playlist.belongsTo(Mood);
module.exports = Mood;