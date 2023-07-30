"use strict";

var express = require('express');

var app = express();

var cors = require("cors");

require('colors');

var fs = require('fs');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');

var cloudinary = require('./middleware/cloudinary');

var uploadProduct = require('./middleware/uploadImage');

var path = require('path');

app.use(express.json()); // public folder

app.use(express["static"]("public"));
app.use(express["static"](path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.send("Welcome to API");
});

var usersModal = require('./models/userModel'); //Get list user


app.get('/user', function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(usersModal.find({}));

        case 3:
          user = _context.sent;
          res.status(200).json(user);
          console.log("\u2705 Get list user Success".green.bold);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log("\u2757  ".concat(_context.t0.message).bgRed.white.strikethrough.bold);
          res.status(500).json({
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //Get detail user

app.get('/user/:id', function _callee2(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(usersModal.findById(id));

        case 4:
          user = _context2.sent;
          res.status(200).json(user);
          console.log("\u2705 Get detail user Success".green.bold);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log("\u2757  ".concat(_context2.t0.message).bgRed.white.strikethrough.bold);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //Create user

app.post('/user', uploadProduct.single('image'), function _callee3(req, res) {
  var result, _req$body, name, email, password, address, phone, role, CheckUser, salt, hashedPassword, newUser, user;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(req.file.path, {
            folder: "avatarUser"
          }));

        case 3:
          result = _context3.sent;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, address = _req$body.address, phone = _req$body.phone, role = _req$body.role;
          _context3.next = 7;
          return regeneratorRuntime.awrap(usersModal.findOne({
            email: email
          }));

        case 7:
          CheckUser = _context3.sent;

          if (!CheckUser) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'Người dùng đã tồn tại'
          }));

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 12:
          salt = _context3.sent;
          _context3.next = 15;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 15:
          hashedPassword = _context3.sent;
          newUser = new usersModal({
            name: name,
            email: email,
            password: hashedPassword,
            address: address,
            phone: phone,
            role: role,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
          }); //Lưu tài khoản

          _context3.next = 19;
          return regeneratorRuntime.awrap(usersModal.create(newUser));

        case 19:
          user = _context3.sent;
          res.status(200).json(user);
          console.log("\u2705 Create user Success".green.bold);
          _context3.next = 28;
          break;

        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](0);
          console.log("\u2757  ".concat(_context3.t0.message).bgRed.white.strikethrough.bold);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 28:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 24]]);
}); //Update user

app.put('/user/:id', function _callee4(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(usersModal.findByIdAndUpdate(id, req.body));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Connat find any user with id"
          }));

        case 7:
          res.status(200).json(user);
          console.log("\u2705 Update user Success".green.bold);
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log("\u2757  ".concat(_context4.t0.message).bgRed.white.strikethrough.bold);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); //Delete user

app["delete"]('/user/:id', function _callee5(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(usersModal.findByIdAndDelete(id));

        case 4:
          user = _context5.sent;

          if (user) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "Connat find any user with id"
          }));

        case 7:
          res.status(200).json(user);
          console.log("\u2705 Delete user Success".green.bold);
          _context5.next = 15;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.log("\u2757  ".concat(_context5.t0.message).bgRed.white.strikethrough.bold);
          res.status(500).json({
            message: _context5.t0.message
          });

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); //connected

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://lampng:vhoOvRTkwH8oWxst@nodejs-server.omzznkp.mongodb.net/api-asm?retryWrites=true&w=majority").then(function () {
  var port = process.env.PORT || 1102; // running server

  var log = console.log;
  log("============================".rainbow.bold);
  app.listen(port, function () {
    return log("| ".rainbow + "Server running on [".concat(port, "]").green.underline.bold + " |".rainbow);
  });
  console.log("\u2705  Connected to MongoDB".green.bold);
})["catch"](function () {
  console.log("\u2757Connected to MongoDB Failed".bgRed.white.strikethrough.bold);
}); // my sesions

var session = require('express-session');

var mongoDB_session = require("connect-mongodb-session")(session);

var secretPanda = new mongoDB_session({
  uri: "mongodb+srv://lampng:vhoOvRTkwH8oWxst@nodejs-server.omzznkp.mongodb.net/api-asm?retryWrites=true&w=majority",
  collection: "mySessions"
});
app.use(session({
  secret: "my secret",
  resave: false,
  saveUninitialized: false,
  store: secretPanda
}));