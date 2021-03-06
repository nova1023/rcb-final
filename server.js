//Dependenciess =======================================================
const Express = require("express"),
    Mongoose = require("mongoose"),
    BodyParser = require("body-parser"),
    CookieParser = require("cookie-parser"),
    Passport = require("passport");

//Setup ===============================================================
var app = Express();
var server = require("http").Server(app);
var port = process.env.PORT || 3000;

//BodyParser Setup -----------------------------------------------
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.text());
app.use(BodyParser.json({ type: "application/vnd.api+json" }));

//CookieParser setup ---------------------------------------------
app.use(CookieParser());

//Passport setup -------------------------------------------------
app.use(Passport.initialize());
app.use(Passport.session());

//set public folder as static ------------------------------------
app.use(Express.static("public"));

//Mongoose database setup ----------------------------------------
//If running on Heroku
if(process.env.MONGODB_URI)
{
	Mongoose.connect(process.env.MONGODB_URI);
}
else //running on local machine
{
	Mongoose.connect("mongodb://localhost/gameDatabase");
}

var db = Mongoose.connection;

db.on("error", function(error)
{
    console.log("Mongoose error: " + error);
});

db.once("open", function()
{
    console.log("Mongoose connection successful.");
});

//SocketIO ============================================================
require("./models/socket")(server);

//Routing =============================================================
app.use(require("./controllers/login-routes.js"));
app.get("/", function(req, res)
{
    res.sendFile("./index.html");
});


//Start Listening =====================================================
server.listen(port, function()
{
    console.log("Listening on port: " + port);
});