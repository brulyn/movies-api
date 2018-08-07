//server.js

const express = require('express');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const app = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb://simplexUser:simplexPass123@localhost:27017/simplex');  // this is where you connect to your mlab database

const Shop = require('./app/models/shops.js');
const Store = require('./app/models/stores.js');
const Category = require('./app/models/categories.js');
const Subcategory = require('./app/models/subcategories.js');
const Product = require('./app/models/products.js');

app.use(bodyParser.urlencoded({ useNewUrlParser: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('App Successful listening on port 3000');
});

//SHOPS
//get all
app.get('/simplex_api/shops', (req, res) => {
    Shop.find((err, shops) => {
        if (err)
            console.log(handleError(err));
        res.json(shops);
    });
});
//get One
app.get('/simplex_api/shops/:id', (req, res) => {
    Shop.findById(req.params.id, (err, shop) => {
        if (err)
            console.log(handleError(err));
        res.json(shop);
    });
});
//insert
app.post('/simplex_api/shops', (req, res) => {
    Shop.create({
        name: req.query.name,
        address: req.query.address,
        telephone: req.query.telephone,
        manager: req.query.manager,
        password: sha1(req.query.password),
        date_subscribe: new Date(),
        email: req.query.email,
        currency: req.query.currency,
        active: req.query.active,
        trial: req.query.trial,
        vat: req.query.vat,
        unpaid: req.query.unpaid,
        fixed_price: req.query.fixed_price,
        user_view: req.query.user_view,
        user_download: req.query.user_download,
        user_add: req.query.user_add,
        type: shop_type,
        store: req.query.store
    }, (err, shop) => {
        if (err)
            console.log(handleError(err));
        Shop.find((err, shops) => {
            if (err)
                console.log(handleError(err));
            res.json(shops);

        });
    });
});
//update
app.put('/simplex_api/shops/:id', (req, res) => {
    Shop.findById(req.params.id, (err, shop) => {
        shop.update(req.query, (err, shops) => {
            if (err)
                console.log(handleError(err));
            Shop.find((err, shops) => {
                if (err)
                    console.log(handleError(err));
                res.json(shops);
            });
        });
    });
});
//delete
app.delete('/simplex_api/shops/:id', (req, res) => {
    Shop.remove({
        _id: req.params.id
    }, (err, shops) => {
        if (err)
            console.log(handleError(err));
        Shop.find((err, shops) => {
            if (err)
                console.log(handleError(err));
            res.json(shops);
        });
    });
});

//STORES
//get all
app.get('/simplex_api/stores', (req, res) => {
    Store.find((err, stores) => {
        if (err)
            console.log(handleError(err));
        res.json(stores);
    });
});
//get One
app.get('/simplex_api/stores/:id', (req, res) => {
    Store.findById(req.params.id, (err, stores) => {
        if (err)
            console.log(handleError(err));
        res.json(stores);
    });
});
//insert
app.post('/simplex_api/stores', (req, res) => {
    Store.create({
        name: req.query.name,
        address: req.query.address,
        telephone: req.query.telephone,
        manager: req.query.manager,
        shop_id: req.query.shop_id
    }, (err, store) => {
        if (err)
            console.log(handleError(err));
        Store.find((err, stores) => {
            if (err)
                console.log(handleError(err));
            res.json(stores);

        });
    });
});
//update
app.put('/simplex_api/stores/:id', (req, res) => {
    Store.findById(req.params.id, (err, store) => {
        store.update(req.query, (err, stores) => {
            if (err)
                console.log(handleError(err));
            Store.find((err, stores) => {
                if (err)
                    console.log(handleError(err));
                res.json(stores);
            });
        });
    });
});
//delete
app.delete('/simplex_api/stores/:id', (req, res) => {
    Store.remove({
        _id: req.params.id
    }, (err, stores) => {
        if (err)
            console.log(handleError(err));
        Store.find((err, stores) => {
            if (err)
                console.log(handleError(err));
            res.json(stores);
        });
    });
});

//CATEGORIES
//get all
app.get('/simplex_api/categories', (req, res) => {
    Category.find((err, categories) => {
        if (err)
            console.log(handleError(err));
        res.json(categories);
    });
});
//get One
app.get('/simplex_api/categories/:id', (req, res) => {
    Category.findById(req.params.id, (err, categories) => {
        if (err)
            console.log(handleError(err));
        res.json(categories);
    });
});
//insert
app.post('/simplex_api/categories', (req, res) => {
    Category.create({
        name: req.query.name,
        shop_id: req.query.shop_id
    }, (err, category) => {
        if (err)
            console.log(handleError(err));
        Category.find((err, categories) => {
            if (err)
                console.log(handleError(err));
            res.json(categories);
        });
    });
});
//update
app.put('/simplex_api/categories/:id', (req, res) => {
    Category.findById(req.params.id, (err, category) => {
        category.update(req.query, (err, categories) => {
            if (err)
                console.log(handleError(err));
            Category.find((err, categories) => {
                if (err)
                    console.log(handleError(err));
                res.json(categories);
            });
        });
    });
});
//delete
app.delete('/simplex_api/categories/:id', (req, res) => {
    Category.remove({
        _id: req.params.id
    }, (err, categories) => {
        if (err)
            console.log(handleError(err));
        Category.find((err, categories) => {
            if (err)
                console.log(handleError(err));
            res.json(categories);
        });
    });
});

//SUBCATEGORIES
//get all
app.get('/simplex_api/subcategories', (req, res) => {
    Subcategory.find((err, subcategories) => {
        if (err)
            console.log(handleError(err));
        res.json(subcategories);
    });
});
//get One
app.get('/simplex_api/subcategories/:id', (req, res) => {
    Subcategory.findById(req.params.id, (err, subcategories) => {
        if (err)
            console.log(handleError(err));
        res.json(subcategories);
    });
});
//insert
app.post('/simplex_api/subcategories', (req, res) => {
    Subcategory.create({
        name: req.query.name,
        shop_id: req.query.shop_id
    }, (err, subcategory) => {
        if (err)
            console.log(handleError(err));
        Subcategory.find((err, subcategories) => {
            if (err)
                console.log(handleError(err));
            res.json(subcategories);
        });
    });
});
//update
app.put('/simplex_api/subcategories/:id', (req, res) => {
    Subcategory.findById(req.params.id, (err, subcategory) => {
        subcategory.update(req.query, (err, subcategories) => {
            if (err)
                console.log(handleError(err));
            Subcategory.find((err, subcategories) => {
                if (err)
                    console.log(handleError(err));
                res.json(subcategories);
            });
        });
    });
});
//delete
app.delete('/simplex_api/subcategories/:id', (req, res) => {
    Subcategory.remove({
        _id: req.params.id
    }, (err, subcategories) => {
        if (err)
            console.log(handleError(err));
        Subcategory.find((err, subcategories) => {
            if (err)
                console.log(handleError(err));
            res.json(subcategories);
        });
    });
});


//PRODUCTS
//get all
app.get('/simplex_api/products', (req, res) => {
    Product.find((err, products) => {
        if (err)
            console.log(handleError(err));
        res.json(products);
    });
});
//get One
app.get('/simplex_api/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, products) => {
        if (err)
            console.log(handleError(err));
        res.json(products);
    });
});
//insert
app.post('/simplex_api/products', (req, res) => {
    Product.create({
        name: req.query.name,
        shop_id: req.query.shop_id
    }, (err, product) => {
        if (err)
            console.log(handleError(err));
        Product.find((err, products) => {
            if (err)
                console.log(handleError(err));
            res.json(products);
        });
    });
});
//update
app.put('/simplex_api/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        product.update(req.query, (err, products) => {
            if (err)
                console.log(handleError(err));
            Product.find((err, products) => {
                if (err)
                    console.log(handleError(err));
                res.json(products);
            });
        });
    });
});
//delete
app.delete('/simplex_api/products/:id', (req, res) => {
    Product.remove({
        _id: req.params.id
    }, (err, products) => {
        if (err)
            console.log(handleError(err));
        Product.find((err, products) => {
            if (err)
                console.log(handleError(err));
            res.json(products);
        });
    });
});