var Sequelize = require('sequelize');
var sequelize = new Sequelize('moodymusic', 'moodymusic', 'michal', {
   dialect: 'mysql',
    host: 'itp460.usc.edu'
});
module.exports = sequelize;
console.log('connected to the db', sequelize);