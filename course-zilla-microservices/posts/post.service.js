const express = require("express");
const app = express();

const cors = require("cors");

const postRouter = require("./routes/post.router");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", postRouter);

module.exports = app;
