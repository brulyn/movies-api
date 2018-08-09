//server.js

const express = require('express');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const app = express();
const cors = require('cors');
const Rx = require('rx');
const observables = require('mongoose-observables');

const mongoose = require('mongoose');
mongoose.connect('mongodb://simplexUser:simplexPass123@localhost:27017/simplex');  // this is where you connect to your mlab database

const Shop = require('./app/models/shops.js');
const Store = require('./app/models/stores.js');
const Category = require('./app/models/categories.js');
const Subcategory = require('./app/models/subcategories.js');
const Product = require('./app/models/products.js');
const Sale = require('./app/models/sales.js');
const Expense = require('./app/models/expenses.js');
const Supplier = require('./app/models/suppliers.js');
const Customer = require('./app/models/customers.js');
const User = require('./app/models/users.js');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ useNewUrlParser: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('App Successful listening on port 3000');
});



//SHOPS
//get all
app.get('/simplex_api/products', (req, res) => {
    var fetched_shop = [];
    var fetched_products = [];
    var to_be_sent = [];
    observables.finder
        .find(Product)
        .subscribe(product => {
            for (let index = 0; index < product.length; index++) {
                var element = product[index];
                // fetched_products[index] = product[index];
                Shop.findById(element.shop_id, (err, shop) => {
                    if (err){
                        console.log(err); 
                    } else{
                        fetched_shop = shop;
                        console.log(fetched_shop); 
                        fetched_products[index] = {
                            product: product[index],
                            shop: fetched_shop
                        }   
                        res.json(fetched_products);                   
                    }
                });    
                // console.log(fetched_products);
            }
        }, err => {
            console.log(err)
        });
});

