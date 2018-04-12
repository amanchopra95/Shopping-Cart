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
        type: sequelize.DataTypes.FLOAT
    }
});

db.sync().then(() => console.log("Database Connected"));

module.exports = {
    Product
}