const Sequelize = require('sequelize');
const db = require('../config/database');

const Employee = db.define('Employee', {
    employee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    First_Name: {
        type: Sequelize.STRING
    },
    Last_Name: {
        type: Sequelize.STRING
    },
    Birthday: {
        type: Sequelize.DATE
    },
    Contract_type: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
});

module.exports = Employee;