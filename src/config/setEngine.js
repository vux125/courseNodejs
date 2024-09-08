const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodeyParser = require('body-parser');

function config(app) {
    //bodyparser
    app.use(bodeyParser.json());
    app.use(bodeyParser.urlencoded({
        extented: true,
    }));

    app.use(express.urlencoded({
        entend: true,
    }));

    app.engine('hbs', engine({
        extname: '.hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
        },
    }))
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../resources/views'));

    app.use(express.static(path.join(__dirname, '../public')));
}

module.exports = config;