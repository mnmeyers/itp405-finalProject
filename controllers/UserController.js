var User = require('./../models/User');
var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
module.exports = {
    users: function(req, res) {
        console.log('Michal rox', req.body.id);
        User.findOrCreate({//this is causing an error
            where: {
                id: req.body.id
            }
        })
        .spread(function(user, results){
                console.log("\n\n\n\n\nUser: ", user);
                console.log("\n\n\n\n\n results: ", results);
            //console.log(user.values);
            res.send(200);
            res.render('users', {
                users: results
            });
        }).fail(function(err){
            console.log('Error occurred with user stuff', err);
        });

    },
    create: function(req, res) {
//what goes here?
    }
};
