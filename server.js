var express = require('express');
var app = express();
const cors = require("cors")
require('colors');
require('bcryptjs');
require('jsonwebtoken');

app.get('/', (req, res)=>{
    res.send("Home");
});

const products = require("./routes/products");
app.get('/products',products);
// port
var port = process.env.PORT || 1102;
// running server
const log = console.log;
log(`============================`.rainbow.bold)
app.listen(port, () =>
    log("| ".rainbow + `Server running on [${port}]`.green.underline.bold + " |".rainbow)
)