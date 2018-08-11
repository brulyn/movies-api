//server.js

const express = require("express");
const bodyParser = require("body-parser");
const sha1 = require("sha1");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const db_url_online = "mongodb://simplexUser:Simplex123@ds215961.mlab.com:15961/simplex";
const db_url_local = "mongodb://simplexUser:simplexPass123@localhost:27017/simplex";
const CONNECTION_URI = process.env.MONGOLAB_ROSE_URI || 'mongodb://simplexUser:simplexPass123@localhost:27017/simplex';
mongoose.connect(CONNECTION_URI);  // this is where you connect to your mlab database

const Shop = require("./app/models/shops.js");
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



//SHOPS
//get all
app.get("/api/shops", (req, res) => {
    Shop.find((err, shops) => {
        if (err)
            console.log(err);
        res.json(shops);
    });
});
//get One
app.get("/api/shops/:id", (req, res) => {
    Shop.findById(req.params.id, (err, shop) => {
        if (err)
            console.log(err);
        res.json(shop);
    });
});
//insert
app.post("/api/shops", (req, res) => {
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
        Shop.find((err, shops) => {
            if (err)
                console.log(err);
            res.json(shops);

        });
    });
});
//update
app.put("/api/shops/:id", (req, res) => {
    Shop.findById(req.params.id, (err, shop) => {
        shop.update(req.query, (err, shops) => {
            if (err)
                console.log(err);
            Shop.find((err, shops) => {
                if (err)
                    console.log(err);
                res.json(shops);
            });
        });
    });
});
//delete
app.delete("/api/shops/:id", (req, res) => {
    Shop.remove({
        _id: req.params.id
    }, (err, shops) => {
        if (err)
            console.log(err);
        Shop.find((err, shops) => {
            if (err)
                console.log(err);
            res.json(shops);
        });
    });
});

//STORES
//get all
app.get("/api/stores", (req, res) => {
    Store.aggregate()
        .lookup({
            from: "shops",
            localField: "shop_id",
            foreignField: "_id",
            as: "shop"
        }).exec((err, store) => {
            res.json(store);
        })
});
//get One
app.get("/api/stores/:id", (req, res) => {
    Store.aggregate()
        .match({ _id: mongoose.Types.ObjectId(req.params.id) })
        .lookup({
            from: "shops",
            localField: "shop_id",
            foreignField: "_id",
            as: "shop"
        })
        .exec((err, store) => {
            res.json(store);
        })
});
//insert
app.post("/api/stores", (req, res) => {
    Store.create({
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
        manager: req.body.manager,
        shop_id: req.body.shop_id
    }, (err, store) => {
        if (err)
            console.log(err);
        else {
            console.log(req);
            Store.find((err, stores) => {
                if (err)
                    console.log(err);
                res.json(stores);

            });
        }

    });
});
//update
app.put("/api/stores/:id", (req, res) => {
    console.log(req)
    Store.findById(req.params.id, (err, store) => {
        store.update(req.query, (err, stores) => {
            if (err)
                console.log(err);
            Store.find((err, stores) => {
                if (err)
                    console.log(err);
                res.json(stores);
            });
        });
    });
});
//delete
app.delete("/api/stores/:id", (req, res) => {
    Store.remove({
        _id: req.params.id
    }, (err, stores) => {
        if (err)
            console.log(err);
        else {
            console.log(req);
            Store.aggregate()
                .lookup({
                    from: "shops",
                    localField: "shop_id",
                    foreignField: "_id",
                    as: "shop"
                }).exec((err, store) => {
                    res.json(store);
                })
        }

    });
});

//CATEGORIES
//get all
app.get("/api/categories", (req, res) => {
    Category.aggregate()
        .lookup({
            from: "shops",
            localField: "shop_id",
            foreignField: "_id",
            as: "shop"
        }).exec((err, category) => {
            res.json(category);
        });
});
//get One
app.get("/api/categories/:id", (req, res) => {
    Category.aggregate()
        .match({ _id: mongoose.Types.ObjectId(req.params.id) })
        .lookup({
            from: "shops",
            localField: "shop_id",
            foreignField: "_id",
            as: "shop"
        })
        .exec((err, category) => {
            res.json(category);
        });
});
//insert
app.post("/api/categories", (req, res) => {
    Category.create({
        name: req.body.name,
        shop_id: req.body.shop_id
    }, (err, category) => {
        if (err)
            console.log(err);
        Category.find((err, categories) => {
            if (err)
                console.log(err);
            res.json(categories);
        });
    });
});
//update
app.put("/api/categories/:id", (req, res) => {
    Category.findById(req.params.id, (err, category) => {
        category.update(req.query, (err, categories) => {
            if (err)
                console.log(err);
            Category.find((err, categories) => {
                if (err)
                    console.log(err);
                res.json(categories);
            });
        });
    });
});
//delete
app.delete("/api/categories/:id", (req, res) => {
    Category.remove({
        _id: req.params.id
    }, (err, categories) => {
        if (err)
            console.log(err);
        Category.find((err, categories) => {
            if (err)
                console.log(err);
            res.json(categories);
        });
    });
});

//SUBCATEGORIES
//get all
app.get("/api/subcategories", (req, res) => {
    Subcategory.aggregate()
        .lookup({
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category"
        })
        .exec((err, subcategories) => {
            res.json(subcategories)
        })
});
//get One
app.get("/api/subcategories/:id", (req, res) => {
    Subcategory.aggregate()
        .match({ _id: mongoose.Types.ObjectId(req.params.id) })
        .lookup({
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category"
        })

        .exec((err, subcategories) => {
            res.json(subcategories)
        })
});
//insert
app.post("/api/subcategories", (req, res) => {
    Subcategory.create({
        name: req.body.name,
        category_id: req.body.category_id
    }, (err, subcategory) => {
        if (err)
            console.log(err);
        Subcategory.find((err, subcategories) => {
            if (err)
                console.log(err);
            res.json(subcategories);
        });
    });
});
//update
app.put("/api/subcategories/:id", (req, res) => {
    Subcategory.findById(req.params.id, (err, subcategory) => {
        subcategory.update(req.query, (err, subcategories) => {
            if (err)
                console.log(err);
            Subcategory.find((err, subcategories) => {
                if (err)
                    console.log(err);
                res.json(subcategories);
            });
        });
    });
});
//delete
app.delete("/api/subcategories/:id", (req, res) => {
    Subcategory.remove({
        _id: req.params.id
    }, (err, subcategories) => {
        if (err)
            console.log(err);
        Subcategory.find((err, subcategories) => {
            if (err)
                console.log(err);
            res.json(subcategories);
        });
    });
});


//PRODUCTS
//get all
app.get("/api/products", (req, res) => {
    Product.aggregate()
        .lookup({
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "categories"
        }).lookup({
            from: "subcategories",
            localField: "subcategory_id",
            foreignField: "_id",
            as: "subcategories"
        }).lookup({
            from: "shops",
            localField: "shop_id",
            foreignField: "_id",
            as: "shops"
        }).exec((err, pro) => {
            res.json(pro);
        });
});
//get One
app.get("/api/products/:id", (req, res) => {
    Product.aggregate()
        .match({ _id: mongoose.Types.ObjectId(req.params.id) })
        .lookup({
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "categories"
        }).lookup({
            from: "subcategories",
            localField: "subcategory_id",
            foreignField: "_id",
            as: "subcategories"
        }).lookup({
            from: "shops",
            localField: "shop_id",
            foreignField: "_id",
            as: "shops"
        }).exec((err, pro) => {
            res.json(pro);
        });
});
//insert
app.post("/api/products", (req, res) => {
    Product.create({
        name: req.body.name,
        shop_id: req.body.shop_id
    }, (err, product) => {
        if (err)
            console.log(err);
        Product.find((err, products) => {
            if (err)
                console.log(err);
            res.json(products);
        });
    });
});
//update
app.put("/api/products/:id", (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        product.update(req.query, (err, products) => {
            if (err)
                console.log(err);
            Product.find((err, products) => {
                if (err)
                    console.log(err);
                res.json(products);
            });
        });
    });
});
//delete
app.delete("/api/products/:id", (req, res) => {
    Product.remove({
        _id: req.params.id
    }, (err, products) => {
        if (err)
            console.log(err);
        Product.find((err, products) => {
            if (err)
                console.log(err);
            res.json(products);
        });
    });
});


//SALES
//get all
app.get("/api/sales", (req, res) => {
    Sale.aggregate()
        .lookup({
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product"
        })
        .lookup({
            from: "shops",
            localField: "shop_id",
            foreignField: "_id",
            as: "shop"
        })
        .exec((err, sale) => {
            res.json(sale);
        })
});
//get One
app.get("/api/sales/:id", (req, res) => {
    Sale.aggregate()
        .match({ _id: mongoose.Types.ObjectId(req.params.id) })
        .lookup({
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product"
        })
        .lookup({
            from: "shops",
            localField: "shop_id",
            foreignField: "_id",
            as: "shop"
        })

        .exec((err, sale) => {
            res.json(sale);
        })
});
//insert
app.post("/api/sales", (req, res) => {
    Sale.create({
        recipient: req.body.recipient,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        total: req.body.total,
        sale_date: new Date(),
        payment_type: req.body.payment_type,
        vat: req.body.vat,
        no_vat: req.body.no_vat,
        nettotal: req.body.nettotal,
        paid: req.body.paid,
        due: req.body.due,
        profit: req.body.profit,
        employee_id: req.body.employee_id,
        month_year: req.body.month_year,
        shop_id: req.body.shop_id,
        store_id: req.body.store_id
    }, (err, sale) => {
        if (err)
            console.log(err);
        Sale.find((err, sales) => {
            if (err)
                console.log(err);
            res.json(sales);
        });
    });
});
//update
app.put("/api/sales/:id", (req, res) => {
    Sale.findById(req.params.id, (err, sale) => {
        sale.update(req.query, (err, sales) => {
            if (err)
                console.log(err);
            Sale.find((err, sales) => {
                if (err)
                    console.log(err);
                res.json(sales);
            });
        });
    });
});
//delete
app.delete("/api/sales/:id", (req, res) => {
    Sale.remove({
        _id: req.params.id
    }, (err, sales) => {
        if (err)
            console.log(err);
        Sale.find((err, sales) => {
            if (err)
                console.log(err);
            res.json(sales);
        });
    });
});



//EXPENSES
//get all
app.get("/api/expenses", (req, res) => {

    Expense.aggregate()
        .lookup({
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product"
        })
        .lookup({
            from: "store",
            localField: "store_id",
            foreignField: "_id",
            as: "store"
        })
        .exec((err, expense) => {
            res.json(expense);
        })
});
//get One
app.get("/api/expenses/:id", (req, res) => {
    Expense.aggregate()
        .match({ _id: mongoose.Types.ObjectId(req.params.id) })
        .lookup({
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product"
        })
        .lookup({
            from: "store",
            localField: "store_id",
            foreignField: "_id",
            as: "store"
        })

        .exec((err, expense) => {
            res.json(expense);
        })
});
//insert
app.post("/api/expenses", (req, res) => {
    Expense.create({
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        total: req.body.total,
        expense_date: new Date(),
        employee_id: req.body.employee_id,
        shop_id: req.body.shop_id,
        store_id: req.body.store_id,
        supplier_id: req.body.supplier_id,
        cost: req.body.cost,
        month_year: req.body.month_year
    }, (err, expense) => {
        if (err)
            console.log(err);
        Expense.find((err, expenses) => {
            if (err)
                console.log(err);
            res.json(expenses);
        });
    });
});
//update
app.put("/api/expenses/:id", (req, res) => {
    Expense.findById(req.params.id, (err, expense) => {
        expense.update(req.query, (err, expenses) => {
            if (err)
                console.log(err);
            Expense.find((err, expenses) => {
                if (err)
                    console.log(err);
                res.json(expenses);
            });
        });
    });
});
//delete
app.delete("/api/expenses/:id", (req, res) => {
    Expense.remove({
        _id: req.params.id
    }, (err, expenses) => {
        if (err)
            console.log(err);
        Expense.find((err, expenses) => {
            if (err)
                console.log(err);
            res.json(expenses);
        });
    });
});


//SUPPLIERS
//get all
app.get("/api/suppliers", (req, res) => {
    Supplier.find((err, suppliers) => {
        if (err)
            console.log(err);
        res.json(suppliers);
    });
});
//get One
app.get("/api/suppliers/:id", (req, res) => {
    Supplier.findById(req.params.id, (err, suppliers) => {
        if (err)
            console.log(err);
        res.json(suppliers);
    });
});
//insert
app.post("/api/suppliers", (req, res) => {
    Supplier.create({
        names: req.body.names,
        address: req.body.address,
        email: req.body.email,
        telephone: req.body.telephone
    }, (err, supplier) => {
        if (err)
            console.log(err);
        Supplier.find((err, suppliers) => {
            if (err)
                console.log(err);
            res.json(suppliers);
        });
    });
});
//update
app.put("/api/suppliers/:id", (req, res) => {
    Supplier.findById(req.params.id, (err, supplier) => {
        supplier.update(req.query, (err, suppliers) => {
            if (err)
                console.log(err);
            Supplier.find((err, suppliers) => {
                if (err)
                    console.log(err);
                res.json(suppliers);
            });
        });
    });
});
//delete
app.delete("/api/suppliers/:id", (req, res) => {
    Supplier.remove({
        _id: req.params.id
    }, (err, suppliers) => {
        if (err)
            console.log(err);
        Supplier.find((err, suppliers) => {
            if (err)
                console.log(err);
            res.json(suppliers);
        });
    });
});


//CUSTOMERS
//get all
app.get("/api/customers", (req, res) => {
    Customer.find((err, customers) => {
        if (err)
            console.log(err);
        res.json(customers);
    });
});
//get One
app.get("/api/customers/:id", (req, res) => {
    Customer.findById(req.params.id, (err, customers) => {
        if (err)
            console.log(err);
        res.json(customers);
    });
});
//insert
app.post("/api/customers", (req, res) => {
    Customer.create({
        names: req.body.names,
        address: req.body.address,
        email: req.body.email,
        telephone: req.body.telephone
    }, (err, customer) => {
        if (err)
            console.log(err);
        Customer.find((err, customers) => {
            if (err)
                console.log(err);
            res.json(customers);
        });
    });
});
//update
app.put("/api/customers/:id", (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        customer.update(req.query, (err, customers) => {
            if (err)
                console.log(err);
            Customer.find((err, customers) => {
                if (err)
                    console.log(err);
                res.json(customers);
            });
        });
    });
});
//delete
app.delete("/api/customers/:id", (req, res) => {
    Customer.remove({
        _id: req.params.id
    }, (err, customers) => {
        if (err)
            console.log(err);
        Customer.find((err, customers) => {
            if (err)
                console.log(err);
            res.json(customers);
        });
    });
});

//USERS
//get all
app.get("/api/users", (req, res) => {

    User.aggregate()
        .lookup({
            from: "stores",
            localField: "store_id",
            foreignField: "_id",
            as: "store"
        })
        .exec((err, user) => {
            res.json(user);
        });
});
//get One
app.get("/api/users/:id", (req, res) => {
    User.aggregate()
        .match({ _id: mongoose.Types.ObjectId(req.params.id) })
        .lookup({
            from: "stores",
            localField: "store_id",
            foreignField: "_id",
            as: "store"
        })
        .exec((err, user) => {
            res.json(user);
        });
});
//insert
app.post("/api/users", (req, res) => {
    User.create({
        names: req.body.names,
        username: req.body.username,
        email: req.body.email,
        password: sha1(req.body.password),
        store_id: req.body.store_id
    }, (err, user) => {
        if (err)
            console.log(err);
        User.find((err, users) => {
            if (err)
                console.log(err);
            res.json(users);
        });
    });
});
//update
app.put("/api/users/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
        user.update(req.query, (err, users) => {
            if (err)
                console.log(err);
            User.find((err, users) => {
                if (err)
                    console.log(err);
                res.json(users);
            });
        });
    });
});
//delete
app.delete("/api/users/:id", (req, res) => {
    User.remove({
        _id: req.params.id
    }, (err, users) => {
        if (err)
            console.log(err);
        User.find((err, users) => {
            if (err)
                console.log(err);
            res.json(users);
        });
    });
});

