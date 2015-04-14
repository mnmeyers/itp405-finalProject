var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
var User = sequelize.define('User', {
    username: {
        field: 'username',
        type: Sequelize.STRING
    },
    password: {
        field: 'password',
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});
module.exports = User;//put this in the model