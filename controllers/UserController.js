var User = require('./../models/User');
var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');
module.exports = {
    users: function(req, res) {
        var user_id = req.body.id;//took out .id
        //take out the other user.findorcreate in userController
        User.findOrCreate({
            where: {
                id: req.body.id
            }
            //first_name: req.body.first_name,
            //last_name: req.body.last_name
            //wouldn't this overwrite every time you log in? so even if you changed ur fname
            //and lname it would still revert back once you log in again
        }).spread(function(user, results){
            console.log("\n\n\nFOUNDA USER:", user);
            req.session.user_id = user_id;
            res.type('json');
            res.status(200).send({message: "humm hum hum"});
            //res.write()
        });
        //User.update({
        //    email: req.email,
        //    description: req.query.description,
        //    facebook: req.query.facebook,
        //    twitter: req.query.twitter
        //}, {
        //    where: {
        //        id: req.body.id
        //        }
        //    });
        //console.log('what is happening', req.query);

        //if(!req.session.user_id){
        //    return res.redirect('/login');
        //}
        //User.update({
        //    email: req.email,
        //    description: req.query.description,
        //    facebook: req.query.facebook,
        //    twitter: req.query.twitter
        //}, {
        //    where: {
        //        id: req.body.id
        //    }
        //}).then(function(){
        //    console.log('what is happening', req.email);
        //    User.find(req.session.user_id).then(function(user){
        //        res.render('profile', {
        //            title: 'Profile',
        //            user: user
        //        });
        //    });
        //
        //});
    },
    create: function(req, res) {
//what goes here?
    }
};
