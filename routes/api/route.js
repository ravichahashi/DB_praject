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


    res.sendFile(path.join(__dirname,`..`,`..`,`EmployeeList.html`));
   // res.send(result);
  
});


router.get('/data/productlines',(req,res)=>{
  
  db.query("SELECT firstName FROM employees", { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
 
});
router.get('/productlot',(req,res)=>{


  res.sendFile(path.join(__dirname,`..`,`..`,`ProductLotList.html`));
 // res.send(result);

});
router.get('/data/productlotlistscale',(req,res)=>{
  
  db.query("SELECT distinct productScale FROM products", { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
 
});
router.get('/data/productlotlistvendor',(req,res)=>{
  
  db.query("SELECT distinct productVendor FROM products", { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
 
});
router.get('/i',(req,res)=>{

  db.query(`INSERT INTO productlines SELECT * FROM productlines`, { type: db.QueryTypes.INSERT})
  .then(result => {console.log(result);
    res.sendFile(path.join(__dirname,`..`,`..`,`LOGIN.html`));})
  .catch(err => {console.log(err);});
});
    


module.exports = router;
