const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('productlines',{
    productLine:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    textDescription:{
        type:   Sequelize.TEXT
    },
    htmlDescription:{
        type:   Sequelize.TEXT
    },
    image:{
        type:   Sequelize.TEXT
    }
   
}, {
    timestamps: false
});

module.exports = db;