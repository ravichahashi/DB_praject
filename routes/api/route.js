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

//get address  
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,`..`,`..`,`Order_list.html`));
   // res.send(result);
});

router.get('/data/productlines/',(req,res)=>{
  
  db.query(`SELECT * FROM  productlines`, { type: db.QueryTypes.SELECT})
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

router.get('/productdetails',(req,res)=>{
  res.sendFile(path.join(__dirname,`..`,`..`,`productdetails.html`));
 // res.send(result);
});

router.get('/data/productdetails/',(req,res)=>{
  
  db.query(`SELECT * FROM  products`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

//END get address    


module.exports = router;