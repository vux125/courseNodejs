const express = require('express');

const home = require('./home.route');
const admin = require('./admin.route');
const cart = require('./cart.route');
const detail_item = require('./detail_item.route');
const login = require('./login.route');
const pay = require('./pay.route');
const register = require('./register.route');
const transport = require('./transport.route');

function routes(app) {
    app.use('/home', home);
    //     app.use('/admin', admin);
    //     app.use('/cart', cart);
    //     app.use('/item', detail_item);
    //     app.use('/login', login);
    //     app.use('/pay', pay);
    //     app.use('/register', register);
    //     app.use('/transport', transport);
}

module.exports = routes;