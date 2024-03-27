const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const dotenv = require("dotenv").config();
const port = 2024;
const cors = require("cors");
const path = require('path');

// console.log(__dirname)
// console.log(path.resolve(__dirname, 'frontend', 'build','index.html'))

app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

app.options("*", cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.set("view engine", "html");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html'));
})
// app.get("/", sendFile);
// app.get("/", (req, res) => res.type('text/html').send());
// app.get("/weather", sendFile);
// app.get("/stormprep", sendFile);
// app.get("/pastweather", sendFile);
// app.get("/legendarystorms", sendFile);
// app.get("/stormwatch", sendFile);
// app.get("/printables", sendFile);
// app.get("/account", sendFile);
// app.get("/weather/summary", sendFile);
// app.get("/account/form", sendFile);


// function sendFile(req, res) {
//   res.setHeader("Content-type", "text/html");
//   res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html'));
//   // console.log("s file")
// }



//mongo
//accounts
const accounts = require("./mongo.js");
app.post("/account", accounts.getAccount);
app.post("/account/create", accounts.createAccount);
app.post("/account/login", accounts.login);
app.post("/account/edit", accounts.updateAccount);
app.post("/account/updateImg", accounts.updateImg);
app.post("/account/delete", accounts.deleteAccount);

//watch
app.post("/stormwatch", accounts.getPosts);
app.post("/stormwatch/postStorm", accounts.postStorm);
app.post("/stormwatch/updateStorm", accounts.updateStorm);
app.post("/stormwatch/deletePost", accounts.deletePost);

// weather api
app.get("/weatherAPI", (req, res) => {
  fetch(process.env.URL)
    .then((response) => response.json())
    .then((jsObject) => {
      res.send(jsObject);
    });
});

app.listen(port, (req, res) => {
  console.log(`🎵Listening on Port: ${port}🎵`);
});
