var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = require('./Playlist');
var Mood = sequelize.define('mood', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER
    },
    mood_name: {
        field: 'mood_name',
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});
Mood.hasMany(Playlist);
Playlist.belongsTo(Mood, {foreignkey: 'moods_id'});
module.exports = Mood;