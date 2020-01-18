const Sequelize = require('sequelize');
const db = require('../config/database');

const Session = db.define('Sessions', {
    session_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    S_DATE: {
        type: Sequelize.STRING,
        defaultValue: "2020-01-10"
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

Session.associate = function(models) {
    Session.belongsTo(models.Client, {foreignKey: 'Client_Id'});
}

module.exports = Session;