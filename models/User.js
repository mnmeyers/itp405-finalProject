var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = require('./Playlist');
var User = sequelize.define('user', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER
    },
    first_name: {
      field: 'first_name',
        type: Sequelize.STRING
    },
    last_name: {
        field: 'last_name',
        type: Sequelize.STRING
    },
    email: {
        field: 'email',
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});
User.hasMany(Playlist);
Playlist.belongsTo(User);
module.exports = User;