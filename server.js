// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 8080;

// Instantiate our Express App
var app = express();
app.use(looger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Designate our public folder as a static directory
app.use(express.static("public"));

var exphbs = require("express-handlebars");

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/headline.js");
app.use("/", routes);

mongoose.connect("mongodb://heroku_gnzk5747:4d2121nhgnfbdl1pfirsdepk9n@ds125262.mlab.com:25262/heroku_gnzk5747");


var db = mongoose.connection;

db.on("error", function(error){
  console.log("Mongoose Error: ", error );
});
db.once("open", function(){
  console.log("Mongoose connection successful.");
});


// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
