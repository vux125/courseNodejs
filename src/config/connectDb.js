const { Sequelize } = require('sequelize');
require('dotenv').config();

const seq = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
})

const connection = async () => {
    try {
        await seq.authenticate();
        console.log("Connection has been established successfully!!!")
    } catch (err) {
        console.error("Unable connect to the database: ", err);
    }
}

module.exports = connection;