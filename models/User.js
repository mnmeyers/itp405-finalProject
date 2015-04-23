var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = require('./Playlist');
var User = sequelize.define('user', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER
    },
    twitter: {
      field: 'twitter',
        type: Sequelize.STRING
    },
    facebook: {
        field: 'facebook',
        type: Sequelize.STRING
    },
    email: {
        field: 'email',
        type: Sequelize.STRING
    },
    description: {
        field: 'description',
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});
User.hasMany(Playlist);
Playlist.belongsTo(User);
module.exports = User;