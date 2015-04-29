var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = require('./Playlist');
var Mood = sequelize.define('mood', {
    mood_name: {
        field: 'mood_name',
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            notContains: 'script'
        }
    }
}, {
    timestamps: false,
    underscored: true
});
Mood.hasMany(Playlist, { foreignKey: 'mood_id' });
Playlist.belongsTo(Mood);
module.exports = Mood;
