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
  
router.get('/orderlist',(req,res)=>{


    res.sendFile(path.join(__dirname,`..`,`..`,`Order_list.html`));
   // res.send(result);
  
});


router.get('/data/productlines',(req,res)=>{
  
  db.query(`SELECT * FROM  productlines`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
//products sreach api
router.get('/data/products/:size&:vender',(req,res)=>{
  //console.log(`${req.params.size}`);
  /*
  ex. not select size and vendor
  http://localhost:9000/data/products/-&-
  ex. not select size only
  http://localhost:9000/data/products/1:700&-
   ex. not select size and vendor
  http://localhost:9000/data/products/1:700&Min Lin Diecast

  */
  console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);
  let size= req.params.size=='none'?'%':req.params.size;
  let vendor= req.params.vender=='none'?'%':req.params.vender;

  db.query(`SELECT * FROM products WHERE productScale LIKE "${size}" AND productVendor LIKE "${vendor}" ORDER BY productName,productScale,productVendor `, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/data/products/:size&:vender/name=:name',(req,res)=>{
  //console.log(`${req.params.size}`);
  /*
  ex. 
  http://localhost:9000/data/products/-&-/name=Alpine
  ex. not select size only
  */

  console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);
  let size= req.params.size=='none'?'%':req.params.size;
  let vendor= req.params.vender=='none'?'%':req.params.vender;
  let name= req.params.name=='0'?'%':req.params.name;
  db.query(`SELECT * FROM products WHERE productScale LIKE "${size}" AND productVendor LIKE "${vendor}" AND productName LIKE '%${name}%' ORDER BY productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/data/products/:size&:vender/code=:code',(req,res)=>{
  /*
  ex. 
  http://localhost:9000/data/products/-&-/code=S12_1099
  ex. not select size only
  */
  //console.log(`${req.params.size}`);
  console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);
  let size= req.params.size=='none'?'%':req.params.size;
  let vendor= req.params.vender=='none'?'%':req.params.vender;
  let code= req.params.code=='0'?'%':req.params.code;
  db.query(`SELECT * FROM products WHERE productScale LIKE "${size}" AND productVendor LIKE "${vendor}" AND productCodeLIKE '%${code}%' ORDER BY productCode,productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});


router.get('/data/products/size',(req,res)=>{
  //console.log(`${req.params.size}`);
  db.query(`SELECT productScale FROM products GROUP by productScale`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});

});
router.get('/data/products/vendor',(req,res)=>{
  //console.log(`${req.params.size}`);
  db.query(`SELECT productVendor FROM products GROUP by productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});

});
//custommer
router.get('/data/customers',(req,res)=>{
  
  db.query(`SELECT *
  FROM customers
  ORDER by customerName `, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/data/customers/name=:name',(req,res)=>{
  
  db.query(`SELECT *
  FROM customers
  WHERE customerName LIKE '${req.params.name}%';
  ORDER by customerName  `, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/data/customers/number=:number',(req,res)=>{
  
  db.query(`SELECT *
  FROM customers
  WHERE customerNumber LIKE '${req.params.number}%';
  ORDER by customerNumber,customerName  `, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

//employees
router.get('/data/employees/allTitle',(req,res)=>{
  
  db.query(`SELECT jobTitle
  FROM employees
  GROUP BY jobTitle`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/data/employees/:title',(req,res)=>{
  let t= req.params.title=='none'?'%':req.params.title;
  db.query(`SELECT *
  FROM employees
  WHERE jobTitle LIKE '${t}'`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/data/employees/:title/name=:name',(req,res)=>{
  let t= req.params.title=='none'?'%':req.params.title;
  let name= req.params.name=='0'?'%':req.params.name;
  db.query(`SELECT *
  FROM employees
  WHERE jobTitle LIKE '${t}' AND employees.firstName||" "||employees.lastName LIKE '%${name}% '
  ORDER BY employees.firstName,employees.lastName`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
router.get('/data/employees/:title/number=:number',(req,res)=>{
  let t= req.params.title=='none'?'%':req.params.title;
  let number= req.params.number=='0'?'%':req.params.number;
  db.query(`SELECT *
  FROM employees
  WHERE jobTitle LIKE '${t}' AND employees.employeeNumber LIKE '%${number}% '
  ORDER BY  employees.employeeNumber,employees.firstName,employees.lastName`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
router.get('/i',(req,res)=>{

  db.query(`SELECT ${req,this.param,name} FROM  productlines`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
    


module.exports = router;
