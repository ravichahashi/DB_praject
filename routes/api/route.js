const express = require('express');
const router = express.Router();
const uuid =require('uuid');
const fs= require('fs');
const path = require('path');
// let users =require('../../Users');
const db=require('./data');
const products = require('./tables/products');
const productlines = require('./tables/productlines');
const payments = require('./tables/payments');
const orders = require('./tables/orders');
const orderdetails = require('./tables/orderdetails');
const offices = require('./tables/offices');
const employees = require('./tables/employees');
const customers = require('./tables/customers');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

router.get('/search/productlines',(req,res)=>{
  
  productlines.findAll()
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});

});

router.get('/login/:email',(req,res)=>{
  employees.findAll({
    where: {
      email:'${req.params.email}',
    }
}).then(result => {
  console.log(result);
  res.send(result);
  }).catch(err => {console.log(err);});

});
//////////////////////products search api//////////////////////////
router.get('/search/products',(req,res)=>{
  //console.log(`${req.params.size}`);
  /*
  ex. not select size and vendor
  http://localhost:9000/search/products/

  */
  //console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);
 // db.query(`SELECT * FROM products ORDER BY productName,productScale,productVendor `, { type: db.QueryTypes.SELECT})
  products.findAll({
    order:[`productName`,`productScale`,`productVendor`]
  })
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
 //db.query(`SELECT * FROM products WHERE productName LIKE '%${name}%' ORDER BY productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
  let name= req.params.name=='0'?'%':req.params.name;
  products.findAll({
   
    where:
    {
      productName:{
        [Op.like]: `%${name}%`
      }
  },
    order:[`productName`,`productScale`,`productVendor`]
  })
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
  products.findAll({
    where:
    {
      productName:{
        [Op.like]: `%${code}%`
      }
  },
    order:[`productCode`,`productName`,`productScale`,`productVendor`]
  })
 // db.query(`SELECT * FROM products WHERE productCode LIKE '%${code}%' ORDER BY productCode,productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/search/products/allSize',(req,res)=>{
  //console.log(`${req.params.size}`);
  products.findAll({
    attributes: [Sequelize.literal('DISTINCT `productScale`'), 'productScale']
  })
 // db.query(`SELECT productScale FROM products GROUP by productScale`, { type: db.QueryTypes.SELECT})
  .then(result => {
    console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});

});
router.get('/search/products/allVendor',(req,res)=>{
  //console.log(`${req.params.size}`);\
  products.findAll({
    attributes: [Sequelize.literal('DISTINCT `productVendor`'), 'productVendor']
  })
 // db.query(`SELECT productVendor FROM products GROUP by productVendor`, { type: db.QueryTypes.SELECT})
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
  let code= req.params.code;
  products.findAll({
    where: {
      productCode:`${code}`
    }
}).then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});


///////////////////////////custommer////////////////////////////////////////////
router.get('/search/customers',(req,res)=>{
  customers.findAll({
    order:[`customerName`]
  })
 /* db.query(`SELECT *
  FROM customers
  ORDER by customerName `, { type: db.QueryTypes.SELECT})*/

  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
 
});



router.get('/sreach/customers/name=:name',(req,res)=>{

  customers.findAll({
   
    where:
    {
      customerName:{
        [Op.like]: `${req.params.name}%`
      }
  }
  ,
      order:[`customerName`]
  })
 /* db.query(`SELECT *
  FROM customers
  WHERE customerName LIKE '${req.params.name}%';
  ORDER by customerName  `, { type: db.QueryTypes.SELECT})*/
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/search/customers/number=:number',(req,res)=>{
  customers.findAll({
   
    where:
    {
      customerNumber:{
        [Op.like]: `${req.params.number}%`
      }
  }
  ,
      order:[`customerName`]
  })
  /*db.query(`SELECT *
  FROM customers
  WHERE customerNumber LIKE '${req.params.number}%';
  ORDER by customerNumber,customerName  `, { type: db.QueryTypes.SELECT})*/
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});


router.get('/data/customers/number=:number',(req,res)=>{
  customers.findAll({
   
    where:
    {
      customerNumber: `${req.params.number}` 
    }
  ,
      order:[`customerNumber`,`customerName`]
  })
  /*db.query(`SELECT *
  FROM customers
  WHERE customerNumber = '${req.params.number}';
  ORDER by customerNumber,customerName`, { type: db.QueryTypes.SELECT})*/
  .then(result => {console.log(result);
  res.send(result[0]);
  })
  .catch(err => {console.log(err);});
});
///////////////////employees//////////////////////////
router.get('/search/employees/allTitle',(req,res)=>{
  employees.findAll({
    attributes: [Sequelize.literal('DISTINCT `jobTitle`'), 'jobTitle']
  })
 /* db.query(`SELECT jobTitle
  FROM employees
  GROUP BY jobTitle`, { type: db.QueryTypes.SELECT})*/
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

// router.get('/search/employees/name=:name',(req,res)=>{
 
//   let name= req.params.name=='0'?'%':req.params.name;
//   employees.findAll({
   
//     where:
//     {
//       customerNumber:{
//         [Op.like]: `${req.params.number}%`
//       }
//   }
//   ,
//       order:[`customerName`]
//   })
//   db.query(`SELECT *
//   FROM employees
//   WHERE employees.firstName||" "||employees.lastName LIKE '%${name}% '
//   ORDER BY employees.firstName,employees.lastName`, { type: db.QueryTypes.SELECT})
//   .then(result => {console.log(result);
//   res.send(result);
//   })
//   .catch(err => {console.log(err);});
// });


router.get('/search/employees/number=:number',(req,res)=>{

  let number= req.params.number=='0'?'%':req.params.number;
  employees.findAll({
   
        where:
        {
          employeeNumber:{
            [Op.like]: `%${number}%`
          }
      }
      ,
          order:[`employeeNumber`,`firstName`,`lastName`]
      })
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});


router.get('/data/employees/:number',(req,res)=>{
  employees.findAll({
   
    where:
    {
      employeeNumber: `${req.params.number}`
    }
  })
  .then(result => {console.log(result);
  res.send(result[0]);
  
  })
  .catch(err => {console.log(err);});
});
//////////////order/////////////////////////////////////
router.get('/search/orders',(req,res)=>{
  orders.findAll()
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
//////////////////////////////////////////////////////////////////////////////////////////

router.get('/i',(req,res)=>{

  db.query(`INSERT INTO productlines SELECT * FROM productlines`, { type: db.QueryTypes.INSERT})
  .then(result => {console.log(result);
    res.sendFile(path.join(__dirname,`..`,`..`,`LOGIN.html`));})
  .catch(err => {console.log(err);});
});
    


module.exports = router;
