const express = require('express');

const home = require('./home.route');
const userInfor = require('./userinfor.route');
const userFee = require('./userfee.route');
const userPoint = require('./userpoint.route');


function routes(app) {
    app.use('/home', home);
    app.use('/userinfor', userInfor);
    app.use('/userfee', userFee);
    app.use('/userpoint', userPoint);

    //     app.use('/admin', admin);
    //     app.use('/cart', cart);
    //     app.use('/item', detail_item);
    //     app.use('/login', login);
    //     app.use('/pay', pay);
    //     app.use('/register', register);
    //     app.use('/transport', transport);
}

module.exports = routes;