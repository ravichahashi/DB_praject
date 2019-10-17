
const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('employees',{
    employeeNumber:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    lastName:{
        type:   Sequelize.TEXT
    },
    firstName:{
        type:   Sequelize.TEXT
    },
    extension:{
        type:   Sequelize.TEXT
    },
    email:{
        type:   Sequelize.TEXT
    },
    officeCode:{
        type:   Sequelize.TEXT
    },
    reportsTo:{
        type:   Sequelize.TEXT
    },
    jobTitle:{
        type:   Sequelize.TEXT
    }
   
}, {
    timestamps: false
});

module.exports = db;