const express = require('express');
const router = express.Router();
const uuid =require('uuid');
const fs= require('fs');
const path = require('path');
// let users =require('../../Users');
const db=require('./data');

 db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
router.get('/',(req,res)=>{
  db.query("SELECT customerName FROM customers", { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result[2].customerName);
                    res.send('Data');})
  .catch(err => {console.log(err);});
});
    


module.exports = router;
