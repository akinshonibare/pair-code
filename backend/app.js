"use strict";
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");
const router = require("./router.js");

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api router function
router(app);

var server = app.listen(config.PORT, () => {
  console.log("server is running on port", config.PORT);
  // CLOUD DB CONNECTION

  const { MONGO_USER, MONGO_PASS, MONGO_URL } = config;

  const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}`;
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB - connection succesful"))
    .catch(err => {
      console.log("MongoDB - connection error");
    });
});

// initialize socket.io
const io = require("socket.io")(server);

io.on("connection", socket => {
  // new user
  console.log("user connected");

  // user disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("room", function(data) {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit("load users and code");
    socket.broadcast.to(data.room).emit("new user join", data.user);
  });

  socket.on("leave room", data => {
    socket.broadcast.to(data.room).emit("user left room", { user: data.user });
    socket.leave(data.room);
  });

  socket.on("sent message", data => {
    socket.broadcast.to(data.room).emit("received message", {
      user: data.user,
      photo: data.photo,
      message: data.message
    });
  });

  socket.on("coding event", function(data) {
    socket.broadcast.to(data.room).emit("receive code", {
      code: data.code,
      currentlyTyping: data.currentlyTyping
    });
  });

  socket.on("send users and code", function(data) {
    socket.broadcast.to(data.room).emit("receive users and code", data);
  });
});
