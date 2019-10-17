const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('payments',{
    customerNumber:{
        type:   Sequelize.TEXT
    },
    checkNumber:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    paymentDate:{
        type:   Sequelize.TEXT
    },
    amount:{
        type:   Sequelize.TEXT
    }
   
}, {
    timestamps: false
});

module.exports = db;