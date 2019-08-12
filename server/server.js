/********************************************************************************************************************
 * @Execution : default node : cmd> chatapp
 * @Purpose : to build the chat app
 * @description :chatapp backend
 * @overview : chatapp backend
 * @author : yathin k <yathink3@gmail.com>
 * @version : 1.0
 * @since : 08-aug-2019
 *******************************************************************************************************************/
//importing required modules
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const bodyParser = require("body-parser");
const routes = require('./routes/routes');

//create express app
const app = express();

// parse requests of content-type -json
app.use(bodyParser.json())

// parse requests of content-type urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

//using expressValidator
app.use(expressValidator());

//rediricting to route
app.use('/',routes);
app.use(express.static('../client'));
// Connecting to the database
mongoose.connect(process.env.MONGO_HOST, {
    useNewUrlParser: true
})

//connection detailes
mongoose.connection.on("connected", () => console.log("connected succefully"))

mongoose.connection.on("disconnected", () => console.log("disconnected successfully"))

mongoose.connection.on("error", () => console.log("error occured while connecting"))


// listen for requests
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is listening on port "+process.env.SERVER_PORT);
});


