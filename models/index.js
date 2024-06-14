const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize);
const Product = require('./product')(sequelize, Sequelize);

sequelize.sync()
    .then(() => console.log('Database & tables created!'));

module.exports = {
    User,
    Product
};
