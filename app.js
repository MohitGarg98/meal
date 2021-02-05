const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/meal_db", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.use("/", require("./routes"));

app.listen("3000", function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("serever 3000");
  }
});
