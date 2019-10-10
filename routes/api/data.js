const Sequelize = require('sequelize');
// let users =require('../../Users');
let users=undefined;
module.exports  = new Sequelize({
    dialect: 'sqlite',
    storage: './database/classicmodels.sqlite'
  });


