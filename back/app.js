const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

const app = express();

mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Connection failed"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
