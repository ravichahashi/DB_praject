
const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('offices',{
    officeCode:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    city:{
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
    state:{
        type:   Sequelize.TEXT
    },
    country:{
        type:   Sequelize.TEXT
    },
    postalCode:{
        type:   Sequelize.TEXT
    },
    territory:{
        type:   Sequelize.TEXT
    }
   
}, {
    timestamps: false
});

module.exports = db;