const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('products',{
    productCode:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    productName:{
        type:   Sequelize.TEXT
    },
    productLine:{
        type:   Sequelize.TEXT
    },
    productScale:{
        type:   Sequelize.TEXT
    },
    productVendor:{
        type:   Sequelize.TEXT
    },
    productDescription:{
        type:   Sequelize.TEXT
    },
    quantityInStock:{
        type:   Sequelize.TEXT
    },
    buyPrice:{
        type:   Sequelize.TEXT
    },
    MSRP:{
        type:   Sequelize.TEXT
    },
}, {
    timestamps: false
});

module.exports = db;