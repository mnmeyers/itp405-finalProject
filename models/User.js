var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var Playlist = require('./Playlist');
var User = sequelize.define('user', {
    twitter: {
      field: 'twitter',
        type: Sequelize.STRING,
        validate: {
            notContains: 'script',
            len: [2,20],
            isAlphanumeric: true
        }
    },
    facebook: {
        field: 'facebook',
        type: Sequelize.STRING,
        validate: {
            notContains: 'script',
            len: [2,20],
            isAlphanumeric: true
        }
    },
    email: {
        field: 'email',
        type: Sequelize.STRING,
        validate: {
            notContains: 'script',
            len: [2,20],
            isEmail: true
        }
    },
    description: {
        field: 'description',
        type: Sequelize.STRING,
        validate: {
            notContains: 'script',
            len: [2,200],
        }
    }
}, {
    timestamps: false,
    underscored: true
});
User.hasMany(Playlist);
Playlist.belongsTo(User);
module.exports = User;