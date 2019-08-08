
const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const bodyParser = require("body-parser");
const routes = require('./routes/routes');

//create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

//using expressValidator
app.use(expressValidator());

//rediricting to route
app.use('/',routes);

// Connecting to the database
mongoose.connect('mongodb://localhost:27017/chatapp', {
    useNewUrlParser: true
})

mongoose.connection.on("connected", () => console.log("connected succefully"))

mongoose.connection.on("disconnected", () => console.log("disconnected successfully"))

mongoose.connection.on("error", () => console.log("error occured while connecting"))


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});


