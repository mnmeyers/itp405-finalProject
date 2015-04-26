var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = require('./Playlist');
var Mood = sequelize.define('mood', {
    mood_name: {
        field: 'mood_name',
        type: Sequelize.STRING,
        validate: {
            allowNull: false,
            notEmpty: true,
            notContains: 'script',
            len: [3,20],
            isAlpha: true
        }
    }
}, {
    timestamps: false,
    underscored: true
});
Mood.hasMany(Playlist);
Playlist.belongsTo(Mood);
//console.log(Mood);
module.exports = Mood;