const express = require("express");
const app = express();
const cors = require("cors")
const proxy = require("express-http-proxy");

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  };

app.use(cors(corsOptions));

app.use("/users", proxy(process.env.USER_MICROSERVICE_URI));
app.use("/posts", proxy(process.env.POST_MICROSERVICE_URI));

module.exports = app;
