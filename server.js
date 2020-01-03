const { user, findAll } = require("./client/config/mongoose");
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./client")));

app.post("/postData", (req, res) => {
  console.log("DATA RECEIVED");
  user.findOne({ name: req.body.name }, (err, found) => {
    // console.log("\n" + err);
    if (err) throw err;
    else if (found) {
      found["blog"].push(req.body.blog);
      found.save();
      console.log(found);
    } else {
      user.create(req.body, data => {
        // console.log(data);
        res.send(data);
      });
    }
  });
});

app.get("/getData", (req, res) => {
  findAll((err, data) => {
    console.log("DATA BACK FROM DB");
    // console.log(data);
    if (err) throw err;
    res.send(data);
  });
});

app.listen(port);
