var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = require('./Playlist');
var User = sequelize.define('user', {
    twitter: {
      field: 'twitter',
        type: Sequelize.STRING,
        validate: {
            notContains: 'script'
        }
    },
    facebook: {
        field: 'facebook',
        type: Sequelize.STRING,
        validate: {
            notContains: 'script'
        }
    },
    email: {
        field: 'email',
        type: Sequelize.STRING,
        validate: {
            notContains: 'script',
            isEmail: true
        }
    },
    description: {
        field: 'description',
        type: Sequelize.STRING,
        validate: {
            notContains: 'script'
        }
    }
}, {
    timestamps: false,
    underscored: true
});
User.hasMany(Playlist);
Playlist.belongsTo(User);
module.exports = User;