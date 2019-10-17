const express = require('express');
const router = express.Router();
const uuid =require('uuid');
const fs= require('fs');
const path = require('path');
// let users =require('../../Users');
const db=require('./data');
const products = require('./tables/products');

 db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//get address  

router.get('/',(req,res)=>{


    res.sendFile(path.join(__dirname,`..`,`..`,`EmployeeList.html`));
   // res.send(result);
  
});


router.get('/productslist',(req,res)=>{
  res.sendFile(path.join(__dirname,`..`,`..`,`ProductLotList.html`));
 // res.send(result);
});
router.get('/data/productlines/',(req,res)=>{

  db.query(`SELECT * FROM  productlines`, { type: db.QueryTypes.SELECT})
});

router.get('/search/productlines',(req,res)=>{
  
  products.findAll()
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/login/:email',(req,res)=>{
  
  db.query(`SELECT * 
  FROM employees
  WHERE email = '${req.params.email}'`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
//////////////////////products search api//////////////////////////
router.get('/search/products',(req,res)=>{
  //console.log(`${req.params.size}`);
  /*
  ex. not select size and vendor
  http://localhost:9000/search/products/

  */
  //console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);

  db.query(`SELECT * FROM products ORDER BY productName,productScale,productVendor `, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/search/products/name=:name',(req,res)=>{
  //console.log(`${req.params.size}`);
  /*
  ex. 
  http://localhost:9000/search/products/-&-/name=Alpine
  ex. not select size only
  */

  console.log(`${req.params.name}`);
 
  let name= req.params.name=='0'?'%':req.params.name;
  db.query(`SELECT * FROM products WHERE productName LIKE '%${name}%' ORDER BY productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/search/products/code=:code',(req,res)=>{
  /*
  ex. 
  http://localhost:9000/search/products/-&-/code=S12_1099
  ex. not select size only
  */
  //console.log(`${req.params.size}`);

  let code= req.params.code=='0'?'%':req.params.code;
  db.query(`SELECT * FROM products WHERE productCode LIKE '%${code}%' ORDER BY productCode,productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/search/products/allSize',(req,res)=>{
  //console.log(`${req.params.size}`);
  db.query(`SELECT productScale FROM products GROUP by productScale`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});

});
router.get('/search/products/allVendor',(req,res)=>{
  //console.log(`${req.params.size}`);
  db.query(`SELECT productVendor FROM products GROUP by productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});

});

router.get('/data/products/:code',(req,res)=>{
  /*
  ex. 
  http://localhost:9000/search/products/-&-/code=S12_1099
  ex. not select size only
  */
  //console.log(`${req.params.size}`);
  console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);

  let code= req.params.code;
  db.query(`SELECT * 
  FROM products 
  WHERE productCode = '${code}'`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});


///////////////////////////custommer////////////////////////////////////////////
router.get('/search/customers',(req,res)=>{
  
  db.query(`SELECT *
  FROM customers
  ORDER by customerName `, { type: db.QueryTypes.SELECT})

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

router.get('/sreach/customers/name=:name',(req,res)=>{

  
  db.query(`SELECT *
  FROM customers
  WHERE customerName LIKE '${req.params.name}%';
  ORDER by customerName  `, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/search/customers/number=:number',(req,res)=>{
  
  db.query(`SELECT *
  FROM customers
  WHERE customerNumber LIKE '${req.params.number}%';
  ORDER by customerNumber,customerName  `, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});


router.get('/data/customers/number=:number',(req,res)=>{
  
  db.query(`SELECT *
  FROM customers
  WHERE customerNumber = '${req.params.number}';
  ORDER by customerNumber,customerName`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result[0]);
  })
  .catch(err => {console.log(err);});
});
///////////////////employees//////////////////////////
router.get('/search/employees/allTitle',(req,res)=>{
  
  db.query(`SELECT jobTitle
  FROM employees
  GROUP BY jobTitle`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/search/employees/name=:name',(req,res)=>{
 
  let name= req.params.name=='0'?'%':req.params.name;
  db.query(`SELECT *
  FROM employees
  WHERE employees.firstName||" "||employees.lastName LIKE '%${name}% '
  ORDER BY employees.firstName,employees.lastName`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});


router.get('/search/employees/number=:number',(req,res)=>{

  let number= req.params.number=='0'?'%':req.params.number;
  db.query(`SELECT *
  FROM employees
  WHERE employees.employeeNumber LIKE '%${number}% '
  ORDER BY  employees.employeeNumber,employees.firstName,employees.lastName`, { type: db.QueryTypes.SELECT})

  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});


router.get('/data/employees/:number',(req,res)=>{

  db.query(`SELECT *
  FROM employees
  WHERE employeeNumber = '${req.params.number}`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result[0]);
  
  })
  .catch(err => {console.log(err);});
});
//////////////order/////////////////////////////////////
router.get('/search/orders',(req,res)=>{
  
  db.query(`SELECT *
  FROM orders`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
//////////////////////////////////////////////////////////////////////////////////////////

router.get('/i',(req,res)=>{

  db.query(`SELECT ${req,this.param,name} FROM  productlines`, { type: db.QueryTypes.SELECT})
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
