const express = require('express');

const app = express();
require('dotenv').config();

const routes = require('./routes/index.route');
const config = require('./config/setEngine');
//const connect = require('./config/connectDb');

config(app);

routes(app);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}/home`)
})