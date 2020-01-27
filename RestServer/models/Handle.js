const Sequelize = require('sequelize');
const db = require('../config/database');

const Handle = db.define('Handles', {
    handles_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Employees_employee_id: {
        type: Sequelize.INTEGER
    },
    Sessions_session_id: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
});

module.exports = Handle;