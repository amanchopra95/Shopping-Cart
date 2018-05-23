const sequelize = require('sequelize');

const db = new sequelize('shopsampledb', 'shopadmin', 'Shoppass1!',{
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
        type: sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    userId: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        },
        unique: 'user_id'
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
    },
    roles: {
        type: sequelize.DataTypes.ENUM('admin', 'producer', 'user'),
        defaultValue: 'user'
    },
    email: {
        type: sequelize.DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    photo: {
        type: sequelize.DataTypes.STRING,
        allowNull: true
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

User.hasOne(Product)

db.sync().then(() => console.log("Database Connected"));

module.exports = {
    Product, User, Cart
}