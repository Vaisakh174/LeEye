const express = require("express");
const app = new express();
const cors = require("cors");//communication
const logger = require("morgan");//to view api call on terminal


app.use(express.json());//json pair
app.use(express.urlencoded({ extended: true }));//json pair
app.use(cors());
app.use(logger("dev"));//morgan


// mongodb
require("./middleware/mongodb.js");


// for hosting
const path = require('path');
app.use(express.static(path.join(__dirname + "/dist/frontend")));
// app.use(express.static("/dist/blog-case_study-2"));


// for api calls
const api = require("./router/api.js");
app.use("/api", api);


// for hosting
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});

// set port 
const port =  3000;
app.listen(port, () => {
    console.log(`........port is now connected at ${port} ........`);
});
