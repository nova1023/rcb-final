//Dependenciess =======================================================
const Express = require("express")
	, Mongoose = require("mongoose")
	, BodyParser = require("body-parser")
	, SocketIO = require("socket.io");

//Setup ===============================================================
var app = Express();
var server = require("http").Server(app);
var io = SocketIO(server);
var port = process.env.PORT || 3000;

//BodyParser Setup
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.text());
app.use(BodyParser.json({ type: "application/vnd.api+json" }));

//set public folder as static
app.use(Express.static("public"));

//Mongoose database setup
Mongoose.connect("mongodb://localhost/gameDatabase");
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
io.on("connection", function(socket)
{
	console.log("user has connected");

	socket.on("disconnect", function()
	{
		console.log("user disconnected");
	});
});

//Routing =============================================================
app.get("/", function(req, res)
{
	res.sendFile("index.html");
});

//Start Listening =====================================================
server.listen(port, function()
{
	console.log("Listening on port: " + port);
});