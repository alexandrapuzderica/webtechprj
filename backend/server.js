const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next()
})

const sequelize = new Sequelize('online_shop','root','', {
  dialect : 'mysql',
  define : {
    timestamps : false
  }
});
 
const User = sequelize.define('user',{
  user_id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name : {
    type : Sequelize.STRING,
    allowNull : true,
    validate : {
      len : [3,60]
    }
  },
  username : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
          len: [3,50]
    }
  },
  password : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
          len: [3,40]
    }
  },
  address : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      len : [2,60]
    }
  }
},{
  underscored : true
});

const Product = sequelize.define('product', {
  product_id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_name : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      len : [5,60]
    }
  },
  price : {
    type : Sequelize.INTEGER,
    allowNull : false,
    validate : {
          isNumeric : true,
          isInt : true,
          min : 1,
          max : 9999
    }
  },
  description : {
    type : Sequelize.TEXT,
    allowNull : true,
    validate : {
      len : [0,200]
    }
  }
});

const Item = sequelize.define('item', {
  id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantity : {
    type : Sequelize.INTEGER,
    allowNull : false,
    validate : {
          isNumeric : true,
          isInt : true,
          min : 1,
          max : 999
    }
  }
});

const Order = sequelize.define('order', {
  order_id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_number : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      len : [5,25]
    }
  },
  price : {
    type : Sequelize.INTEGER,
    allowNull : false,
    validate : {
          isNumeric : true,
          isInt : true,
          min : 1,
          max : 9999
    }
  },
  payment : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
        len : [2,10]
    }
  }
});

User.hasMany(Order);
Order.hasMany(Item);
Product.hasMany(Item);


app.get('/create', (req, res, next) => {
  sequelize.sync({force : true})
    .then(() => res.status(201).send('created'))
    .catch((error) => next(error));
});

app.get('/orders', (req, res, next) => {
  Order.findAll()
    .then((orders) => res.status(200).json(orders))
    .catch((error) => next(error));
});

app.get('/users', (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => next(error));
});

app.get('/products', (req, res, next) => {
  Product.findAll()
    .then((products) => res.status(200).json(products))
    .catch((error) => next(error));
});

app.get('/items', (req, res, next) => {
  Item.findAll()
    .then((item) => res.status(200).json(item))
    .catch((error) => next(error));
});

app.post('/users', (req, res, next) =>{
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ Error: "Missing fields for registration" });
  }
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch(Sequelize.ValidationError, function (err) {
        return res.status(422).json({ message: err.message });
    })
    .catch((err) => res.status(422).json({ message: err.message }))
})

app.post('/products', (req, res, next) => {
  Product.create(req.body)
    .then(() => res.status(201).send('created'))
    .catch((error) => next(error));
});

app.post('/orders', (req, res, next) => {
  Order.create(req.body)
    .then(() => res.status(201).send('created'))
    .catch((error) => next(error));
});

app.post('/users/:uid/orders', (req, res, next) =>{
    User.findById(req.params.uid)
    .then((user) => {
      if(user){
        let order = req.body
        order.user_user_id = user.user_id
        return Order.create(order)
      }
      else{
        res.status(404).send('user not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('order created')
      }
    })
    .catch((err) => next(err))
})

app.post('/orders/:oid/items', (req, res, next) =>{
    Order.findById(req.params.oid)
    .then((order) => {
      if(order){
        let item = req.body
        item.orderOrderId = order.order_id
        return Item.create(item)
      }
      else{
        res.status(404).send('order not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('order item created')
      }
    })
    .catch((err) => next(err))
})

app.post('/items', (req, res, next) => {
  Item.create(req.body)
    .then(() => res.status(201).send('created'))
    .catch((error) => next(error));
});

app.get('/users/:username', (req, res, next) => {
    User.findAll({
        where: {
          username: req.params.username
        }
      })
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err))
});

app.get('/products/:pid/items', (req, res, next) => {
  Product.findById(req.params.pid)
    .then((product) => {
      if(product){
        return product.getItems()
      }
      else{
        res.status(404).send('product not found')
      }
    })
    .then((item) => {
      if (!res.headersSent){
        res.status(200).json(item)
      }
    })
    .catch((err) => next(err))
});

app.get('/orders/:oid/items', (req, res, next) => {
  Order.findById(req.params.oid)
    .then((order) => {
      if(order){
        return order.getItems()
      }
      else{
        res.status(404).send('not found')
      }
    })
    .then((item) => {
      if (!res.headersSent){
        res.status(200).json(item)
      }
    })
    .catch((err) => next(err))
});

app.get('/users/:uid/orders', (req, res, next) => {
  User.findById(req.params.uid)
    .then((user) => {
      if(user){
        return user.getOrders()
      }
      else{
        res.status(404).send('not found')
      }
    })
    .then((order) => {
      if (!res.headersSent){
        res.status(200).json(order)
      }
    })
    .catch((err) => next(err))
});

app.put('/user/:id',(req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user){
        return user.update(req.body, {fields : ['name','username', 'password','address']})
      }
      else{
        res.status(404).send('user not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('user modified')
      }
    })
    .catch((err) => next(err))
});

app.put('/product/:id',(req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product){
        return product.update(req.body, {fields : ['product_name','price', 'description']})
      }
      else{
        res.status(404).send('product not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('product modified')
      }
    })
    .catch((err) => next(err))
});


app.delete('/users/:uid', (req, res, next) => {
  User.findById(req.params.uid)
    .then((user) => {
      if (user){
        return user.destroy()
      }
      else{
        res.status(404).send('user not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('user removed')
      }
    })
    .catch((err) => next(err))
});

app.delete('/products/:pid', (req, res, next) => {
  Product.findById(req.params.pid)
    .then((product) => {
      if (product){
        return product.destroy()
      }
      else{
        res.status(404).send('product not found')
      }
    })
    .then(() => {
      if (!res.headersSent){
        res.status(201).send('product removed')
      }
    })
    .catch((err) => next(err))
});

app.use((err, req, res, next) => {
  console.warn(err);
  res.status(500).send('some error');
});

app.listen(8080);



