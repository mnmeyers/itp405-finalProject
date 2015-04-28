var User = require('./../models/User');
var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
module.exports = {
    create: function(req, res) {
        var user_id = req.body.id;
        //take out the other user.findorcreate in userController
        User.findOrCreate({
            where: {
                id: req.body.id
            }
        }).spread(function(user, results){
            req.session.user_id = user_id;
            res.type('json');
            res.status(200).send({message: "humm hum hum"});
        });

    },
    get: function(req, res) {
        if(!req.session.user_id){
            return res.redirect(301, '/login');
        }
        User.find(req.session.user_id).then(function(user){
            console.log('profile view rendered');
            res.render('profile', {
                title: 'Profile',
                user: user
            });
        });
    },
    update: function(req, res) {
        if(!req.session.user_id){
            return res.redirect(301, '/login');
        } else {
            req.session.sessionFlash = {
                type: 'success',
                message: 'You have successfully edited your profile info!'
            };
            res.redirect(301, '/profile');
        }
        User.update({
            email: req.body.email,
            description: req.body.description,
            facebook: req.body.facebook,
            twitter: req.body.twitter
        }, {
            where: {
                id: req.session.user_id
            }
        }).then(function(){
            User.find(req.session.user_id).then(function(user){
                res.render('profile', {
                    title: 'Profile',
                    user: user
                });
            });

        });
    }
};
