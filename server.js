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
const Sale = require('./app/models/sales.js');
const Expense = require('./app/models/expenses.js');
const Supplier = require('./app/models/suppliers.js');
const Customer = require('./app/models/customers.js');
const User = require('./app/models/users.js');

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


//SALES
//get all
app.get('/simplex_api/sales', (req, res) => {
    Sale.find((err, sales) => {
        if (err)
            console.log(handleError(err));
        res.json(sales);
    });
});
//get One
app.get('/simplex_api/sales/:id', (req, res) => {
    Sale.findById(req.params.id, (err, sales) => {
        if (err)
            console.log(handleError(err));
        res.json(sales);
    });
});
//insert
app.post('/simplex_api/sales', (req, res) => {
    Sale.create({
        recipient: req.query.recipient,
        product_id: req.query.product_id,
        quantity: req.query.quantity,
        total: req.query.total,
        sale_date: new Date(),
        payment_type: req.query.payment_type,
        vat: req.query.vat,
        no_vat: req.query.no_vat,
        nettotal: req.query.nettotal,
        paid: req.query.paid,
        due: req.query.due,
        profit: req.query.profit,
        employee_id: req.query.employee_id,
        month_year: req.query.month_year,
        shop_id: req.query.shop_id,
        store_id: req.query.store_id
    }, (err, sale) => {
        if (err)
            console.log(handleError(err));
        Sale.find((err, sales) => {
            if (err)
                console.log(handleError(err));
            res.json(sales);
        });
    });
});
//update
app.put('/simplex_api/sales/:id', (req, res) => {
    Sale.findById(req.params.id, (err, sale) => {
        sale.update(req.query, (err, sales) => {
            if (err)
                console.log(handleError(err));
            Sale.find((err, sales) => {
                if (err)
                    console.log(handleError(err));
                res.json(sales);
            });
        });
    });
});
//delete
app.delete('/simplex_api/sales/:id', (req, res) => {
    Sale.remove({
        _id: req.params.id
    }, (err, sales) => {
        if (err)
            console.log(handleError(err));
        Sale.find((err, sales) => {
            if (err)
                console.log(handleError(err));
            res.json(sales);
        });
    });
});



//EXPENSES
//get all
app.get('/simplex_api/expenses', (req, res) => {
    Expense.find((err, expenses) => {
        if (err)
            console.log(handleError(err));
        res.json(expenses);
    });
});
//get One
app.get('/simplex_api/expenses/:id', (req, res) => {
    Expense.findById(req.params.id, (err, expenses) => {
        if (err)
            console.log(handleError(err));
        res.json(expenses);
    });
});
//insert
app.post('/simplex_api/expenses', (req, res) => {
    Expense.create({
        product_id: req.query.product_id,
        quantity: req.query.quantity,
        total: req.query.total,
        expense_date: new Date(),
        employee_id: req.query.employee_id,
        shop_id: req.query.shop_id,
        store_id: req.query.store_id,
        supplier_id: req.query.supplier_id,
        cost: req.query.cost,
        month_year: req.query.month_year
    }, (err, expense) => {
        if (err)
            console.log(handleError(err));
        Expense.find((err, expenses) => {
            if (err)
                console.log(handleError(err));
            res.json(expenses);
        });
    });
});
//update
app.put('/simplex_api/expenses/:id', (req, res) => {
    Expense.findById(req.params.id, (err, expense) => {
        expense.update(req.query, (err, expenses) => {
            if (err)
                console.log(handleError(err));
            Expense.find((err, expenses) => {
                if (err)
                    console.log(handleError(err));
                res.json(expenses);
            });
        });
    });
});
//delete
app.delete('/simplex_api/expenses/:id', (req, res) => {
    Expense.remove({
        _id: req.params.id
    }, (err, expenses) => {
        if (err)
            console.log(handleError(err));
        Expense.find((err, expenses) => {
            if (err)
                console.log(handleError(err));
            res.json(expenses);
        });
    });
});


//SUPPLIERS
//get all
app.get('/simplex_api/suppliers', (req, res) => {
    Supplier.find((err, suppliers) => {
        if (err)
            console.log(handleError(err));
        res.json(suppliers);
    });
});
//get One
app.get('/simplex_api/suppliers/:id', (req, res) => {
    Supplier.findById(req.params.id, (err, suppliers) => {
        if (err)
            console.log(handleError(err));
        res.json(suppliers);
    });
});
//insert
app.post('/simplex_api/suppliers', (req, res) => {
    Supplier.create({
        names: req.query.names,
        address: req.query.address,
        email: req.query.email,
        telephone: req.query.telephone
    }, (err, supplier) => {
        if (err)
            console.log(handleError(err));
        Supplier.find((err, suppliers) => {
            if (err)
                console.log(handleError(err));
            res.json(suppliers);
        });
    });
});
//update
app.put('/simplex_api/suppliers/:id', (req, res) => {
    Supplier.findById(req.params.id, (err, supplier) => {
        supplier.update(req.query, (err, suppliers) => {
            if (err)
                console.log(handleError(err));
            Supplier.find((err, suppliers) => {
                if (err)
                    console.log(handleError(err));
                res.json(suppliers);
            });
        });
    });
});
//delete
app.delete('/simplex_api/suppliers/:id', (req, res) => {
    Supplier.remove({
        _id: req.params.id
    }, (err, suppliers) => {
        if (err)
            console.log(handleError(err));
        Supplier.find((err, suppliers) => {
            if (err)
                console.log(handleError(err));
            res.json(suppliers);
        });
    });
});


//CUSTOMERS
//get all
app.get('/simplex_api/customers', (req, res) => {
    Customer.find((err, customers) => {
        if (err)
            console.log(handleError(err));
        res.json(customers);
    });
});
//get One
app.get('/simplex_api/customers/:id', (req, res) => {
    Customer.findById(req.params.id, (err, customers) => {
        if (err)
            console.log(handleError(err));
        res.json(customers);
    });
});
//insert
app.post('/simplex_api/customers', (req, res) => {
    Customer.create({
        names: req.query.names,
        address: req.query.address,
        email: req.query.email,
        telephone: req.query.telephone
    }, (err, customer) => {
        if (err)
            console.log(handleError(err));
        Customer.find((err, customers) => {
            if (err)
                console.log(handleError(err));
            res.json(customers);
        });
    });
});
//update
app.put('/simplex_api/customers/:id', (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        customer.update(req.query, (err, customers) => {
            if (err)
                console.log(handleError(err));
            Customer.find((err, customers) => {
                if (err)
                    console.log(handleError(err));
                res.json(customers);
            });
        });
    });
});
//delete
app.delete('/simplex_api/customers/:id', (req, res) => {
    Customer.remove({
        _id: req.params.id
    }, (err, customers) => {
        if (err)
            console.log(handleError(err));
        Customer.find((err, customers) => {
            if (err)
                console.log(handleError(err));
            res.json(customers);
        });
    });
});

//USERS
//get all
app.get('/simplex_api/users', (req, res) => {
    User.find((err, users) => {
        if (err)
            console.log(handleError(err));
        res.json(users);
    });
});
//get One
app.get('/simplex_api/users/:id', (req, res) => {
    User.findById(req.params.id, (err, users) => {
        if (err)
            console.log(handleError(err));
        res.json(users);
    });
});
//insert
app.post('/simplex_api/users', (req, res) => {
    User.create({
        names: req.query.names,
        username: req.query.username,
        email: req.query.email,
        password: sha1(req.query.password),
        store_id: req.query.store_id
    }, (err, user) => {
        if (err)
            console.log(handleError(err));
        User.find((err, users) => {
            if (err)
                console.log(handleError(err));
            res.json(users);
        });
    });
});
//update
app.put('/simplex_api/users/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.update(req.query, (err, users) => {
            if (err)
                console.log(handleError(err));
            User.find((err, users) => {
                if (err)
                    console.log(handleError(err));
                res.json(users);
            });
        });
    });
});
//delete
app.delete('/simplex_api/users/:id', (req, res) => {
    User.remove({
        _id: req.params.id
    }, (err, users) => {
        if (err)
            console.log(handleError(err));
        User.find((err, users) => {
            if (err)
                console.log(handleError(err));
            res.json(users);
        });
    });
});

