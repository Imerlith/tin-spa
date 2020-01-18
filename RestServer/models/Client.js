const Sequelize = require('sequelize');
const db = require('../config/database');

const Client = db.define('Clients', {
    Client_Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    First_Name: {
        type: Sequelize.STRING
    },
    Last_Name: {
        type: Sequelize.STRING
    },
    Last_Visit_Date: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NOW
    },
    Birthday: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NOW
    },
    Favourite_Game: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
});

module.exports = Client;