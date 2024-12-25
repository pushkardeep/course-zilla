const express = require("express");
const app = express();
const proxy = require("express-http-proxy");

app.get("/", (req, res) => {
  res.send("Gateway is working fine");
});

app.use("/users", proxy(process.env.USER_MICROSERVICE_URI));
app.use("/posts", proxy(process.env.POST_MICROSERVICE_URI));

module.exports = app;
