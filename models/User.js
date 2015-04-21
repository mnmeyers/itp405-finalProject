var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = require('./Playlist');
var User = sequelize.define('user', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});
User.hasMany(Playlist);
Playlist.belongsTo(User);
module.exports = User;