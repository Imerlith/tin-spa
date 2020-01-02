import { Sequelize, Model } from 'sequelize';

class Employee extends Model{}
Employee.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bonus: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    contractType: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName : 'Employee'
});