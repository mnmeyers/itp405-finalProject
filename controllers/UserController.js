var User = require('./../models/User');
var Playlist = require('./../models/Playlist');
var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
module.exports = {
    create: function(req, res) {
        var user_id = req.body.id;
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
            Playlist.findAll({
                where:{
                    user_id: req.session.user_id
                }
            }).then(function(playlists){
                console.log(playlists);
                res.render('profile', {
                    title: 'Profile',
                    user: user,
                    playlists: playlists
                });
            }, function(err){
// HANDLE PLAYLIST NOT FOUND ERROR
            });
        }, function(err){
// HANDLE USER NOT FOUND ERROR
        });
    },

    update: function(req, res) {
        if(!req.session.user_id){
            return res.redirect(301, '/login');
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
        }).spread(function(user, updated){
            req.session.sessionFlash = {
                type: 'success',
                message: 'You successfully updated your profile!'
            };
            res.redirect(301, '/profile');
        }).catch(function(error){
            req.session.sessionFlash = {
                type: 'danger',
                message: 'You must put in a valid email!'
            };
            res.redirect(301, '/profile');
        })
            .then(function(){
            User.find(req.session.user_id).then(function(user){
                res.render('profile', {
                    title: 'Profile',
                    user: user
                });
            });
        });
    }
};
