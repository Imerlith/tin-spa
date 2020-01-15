const Sequelize = require('sequelize');
module.exports = new Sequelize('tin', 'root', 'tin', {
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: false,

    pool: {
        max: 5,
        min: 0,
        accquire: 30000,
        idle: 10000
    },

});

