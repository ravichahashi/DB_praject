
const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('customers',{
    customerNumber:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    customerName:{
        type:   Sequelize.TEXT
    },
    contactLastName:{
        type:   Sequelize.TEXT
    },
    contactFirstName:{
        type:   Sequelize.TEXT
    },
    phone:{
        type:   Sequelize.TEXT
    },
    addressLine1:{
        type:   Sequelize.TEXT
    },
    addressLine2:{
        type:   Sequelize.TEXT
    },
    city:{
        type:   Sequelize.TEXT
    } ,
    state:{
        type:   Sequelize.TEXT
    },
    postalCode:{
        type:   Sequelize.TEXT
    },
    country:{
        type:   Sequelize.TEXT
    },
    salesRepEmployeeNumber:{
        type:   Sequelize.TEXT
    },
    creditLimit:{
        type:   Sequelize.TEXT
    }
   
}, {
    timestamps: false
});

module.exports = db;