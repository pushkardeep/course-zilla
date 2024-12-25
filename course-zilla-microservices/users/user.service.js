const express = require("express");
const app = express();

const cors = require("cors");

const userRouter = require("./routes/user.router");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

module.exports = app;
