const sequelize = require('sequelize');

const db = new sequelize('shopsampledb', 'user', 'password',{
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Product = db.define('product', {
    name: {
        type: sequelize.DataTypes.STRING(50),
        allowNull: false
    },

    price: {
        type: sequelize.DataTypes.FLOAT
    }
});

const User = db.define('user', {
    username: {
        type: sequelize.DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
});

const Cart = db.define('cart', {
    quantity: {
        type: sequelize.DataTypes.INTEGER,
        defaultValue: 0
    },
    userId: {
        type: sequelize.DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        unique: 'user_product'
    },
    productId: {
        type: sequelize.DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        },
        unique: 'user_product'
    }
})

db.sync().then(() => console.log("Database Connected"));

module.exports = {
    Product, User, Cart
}