const Sequelize = require('sequelize');
const db = require('../config/database');

const Employee = db.define('Employee', {
    employee_id: {
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
    Bonus: {
        type:Sequelize.INTEGER,
        default:0
    },
    Birthday: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    Contract_type: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
});

module.exports = Employee;