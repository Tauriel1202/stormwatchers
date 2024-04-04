const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const dotenv = require("dotenv").config();
const port = 2024;
const cors = require("cors");
const path = require("path");

// console.log(__dirname)
// console.log(path.resolve(__dirname, 'frontend', 'build','index.html'))
app.use(express.static("frontend/build"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "html");
app.use(bodyParser.json());
app.options("*", cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
// app.get("/", sendFile);
// app.get("/", (req, res) => res.type('text/html').send());
app.get("/weather", sendFile);
app.get("/stormprep", sendFile);
app.get("/pastweather", sendFile);
app.get("/legendarystorms", sendFile);
app.get("/stormwatch", sendFile);
app.get("/printables", sendFile);
app.get("/account", sendFile);
app.get("/weather/summary", sendFile);
app.get("/account/form", sendFile);

function sendFile(req, res) {
  res.setHeader("Content-type", "text/html");
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
}

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
  let url = process.env.URL;
  url = url.replace("@lat", req.query.lat);
  url = url.replace("@lon", req.query.lon);

  fetch(url)
    .then((response) => response.json())
    .then((jsObject) => {
      res.send(jsObject);
    });
});

app.get("/locSearchAPI", (req, res) => {
  let query = req.query.loc;
  let params = query.split(",");
  let url = process.env.NEWURL;

  url = url.replace("@city", params[0]);
  url = url.replace(",@state", params[1] ? `,${params[1]}` : "");
  fetch(url)
    .then((response) => response.json())
    .then((jsObject) => {
      res.send(jsObject);
    });
});

app.listen(port, (req, res) => {
  console.log(`🎵Listening on Port: ${port}🎵`);
});
