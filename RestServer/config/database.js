const Sequelize = require('sequelize');
const Client = require('../models/Client');
const Emp = require('../models/Employee');
const Session = require('../models/Session');
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

