var express = require('express');
var router = express.Router();

router.get("/products",(req,res)=> {
    res.send("Product Page")
})

module.exports = router;