
const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('orders',{
    orderNumber:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    orderDate:{
        type:   Sequelize.TEXT
    },
    requiredDate:{
        type:   Sequelize.TEXT
    },
    shippedDate:{
        type:   Sequelize.TEXT
    },
    status:{
        type:   Sequelize.TEXT
    },
    comments:{
        type:   Sequelize.TEXT
    },
    customerNumber:{
        type:   Sequelize.TEXT
    },
   
}, {
    timestamps: false
});

module.exports = db;