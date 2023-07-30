var express = require('express');
var app = express();
const cors = require("cors")
require('colors');
require('bcryptjs');
require('jsonwebtoken');
const mongoose = require('mongoose');
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Welcome to API");
});

const usersModal = require('./models/userModel');
//Get list user
app.get('/user', async(req, res) => {
    try {
        const user = await usersModal.find({});
        res.status(200).json(user) ;
        console.log(`✅ Get list user Success`.green.bold);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({message: error.message})
    }
})
//Get detail user
app.get('/user/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await usersModal.findById(id);
        res.status(200).json(user) ;
        console.log(`✅ Get detail user Success`.green.bold);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({message: error.message})
    }
})
//Create user
app.post('/user', async(req, res) => {
    try {
        const user = await usersModal.create(req.body);
        res.status(200).json(user) ;
        console.log(`✅ Create user Success`.green.bold);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({message: error.message})
    }
})
//Update user
app.put('/user/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await usersModal.findByIdAndUpdate(id,req.body);
        if (!user) {
            return res.status(404).json({message: `Connat find any user with id`})
        }
        res.status(200).json(user) ;
        console.log(`✅ Update user Success`.green.bold);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({message: error.message})
    }
})
//Delete user
app.delete('/user/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await usersModal.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({message: `Connat find any user with id`})
        }
        res.status(200).json(user) ;
        console.log(`✅ Delete user Success`.green.bold);
    } catch (error) {
        console.log(`❗  ${error.message}`.bgRed.white.strikethrough.bold);
        res.status(500).json({message: error.message})
    }
})
//connected
mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://lampng:vhoOvRTkwH8oWxst@nodejs-server.omzznkp.mongodb.net/api-asm?retryWrites=true&w=majority").then(() => {
    var port = process.env.PORT || 1102;
    // running server
    const log = console.log;
    log(`============================`.rainbow.bold)
    app.listen(port, () =>
        log("| ".rainbow + `Server running on [${port}]`.green.underline.bold + " |".rainbow)
    )
    console.log(`✅  Connected to MongoDB`.green.bold);
}).catch(() => {
    console.log(`❗Connected to MongoDB Failed`.bgRed.white.strikethrough.bold);

});