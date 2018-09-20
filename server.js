//server.js

const express = require("express");
const bodyParser = require("body-parser");
const sha1 = require("sha1");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const db_url_online = "mongodb://ccappUser:ccappUser123@ds261040.mlab.com:61040/ccapp";
const CONNECTION_URI = process.env.MONGOLAB_ROSE_URI || 'mongodb://ccappUser:ccappUser123@ds261040.mlab.com:61040/ccapp';
mongoose.connect(db_url_online);  // this is where you connect to your mlab database

const Shop = require("./app/models/movies.js");
const Store = require("./app/models/stores.js");
const Category = require("./app/models/categories.js");
const Subcategory = require("./app/models/subcategories.js");
const Product = require("./app/models/products.js");
const Sale = require("./app/models/sales.js");
const Expense = require("./app/models/expenses.js");
const Supplier = require("./app/models/suppliers.js");
const Customer = require("./app/models/customers.js");
const User = require("./app/models/users.js");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ useNewUrlParser: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App Successful listening on port ${PORT}`);
});



//movies
//get all
app.get("/api/movies", (req, res) => {
    Shop.find((err, movies) => {
        if (err)
            console.log(err);
        res.json(movies);
    });
});
//get One
app.get("/api/movies/:id", (req, res) => {
    Shop.findById(req.params.id, (err, shop) => {
        if (err)
            console.log(err);
        res.json(shop);
    });
});
//insert
app.post("/api/movies", (req, res) => {
    Shop.create({
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
        manager: req.body.manager,
        password: sha1(req.body.password),
        date_subscribe: new Date(),
        email: req.body.email,
        currency: req.body.currency,
        active: req.body.active,
        trial: req.body.trial,
        vat: req.body.vat,
        unpaid: req.body.unpaid,
        fixed_price: req.body.fixed_price,
        user_view: req.body.user_view,
        user_download: req.body.user_download,
        user_add: req.body.user_add,
        type: shop_type,
        store: req.body.store
    }, (err, shop) => {
        if (err)
            console.log(err);
        Shop.find((err, movies) => {
            if (err)
                console.log(err);
            res.json(movies);

        });
    });
});
//update
app.put("/api/movies/:id", (req, res) => {
    Shop.findById(req.params.id, (err, shop) => {
        shop.update(req.query, (err, movies) => {
            if (err)
                console.log(err);
            Shop.find((err, movies) => {
                if (err)
                    console.log(err);
                res.json(movies);
            });
        });
    });
});
//delete
app.delete("/api/movies/:id", (req, res) => {
    Shop.remove({
        _id: req.params.id
    }, (err, movies) => {
        if (err)
            console.log(err);
        Shop.find((err, movies) => {
            if (err)
                console.log(err);
            res.json(movies);
        });
    });
});

