var Sequelize = require('sequelize');
var sequelize = new Sequelize('moodymusic', 'moodymusic', 'michal', {
   dialect: 'mysql',
    host: 'itp460.usc.edu'
});
sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });
module.exports = sequelize;
//console.log('connected to the db', sequelize);