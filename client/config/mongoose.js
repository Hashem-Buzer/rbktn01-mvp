var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected with the database successfully!");
});

var User = mongoose.Schema({
  name: String,
  blog: []
});

var user = mongoose.model("User", User);

function findAll(callback) {
  user.find({}, callback);
}

function findOne(name, callback) {
  user.find({ name: name }, callback);
}

module.exports.user = user;
module.exports.findAll = findAll;
module.exports.findOne = findOne;
