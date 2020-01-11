const Sequelize = require('sequelize');
const db = require('../config/database');

const Session = db.define('Sessions', {
    session_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    S_DATE: {
        type: Sequelize.STRING
    },
    Hours: {
        type: Sequelize.INTEGER
    },
    Clients_Client_ID: {
        type: Sequelize.INTEGER,
        
    }
}, {
    timestamps: false,
});

module.exports = Session;