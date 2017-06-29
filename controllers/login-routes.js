// Dependenciess =================================================
const Express = require("express"),
    GenerateToken = require("./helper-code/token-generator.js");

// Variables =====================================================
var router = Express.Router();

//Bring in schemas ===============================================
const User = require("../models/user.js"),
    Guest = require("../models/guest.js");

//Routing ========================================================
router.post("/api/register", function(req, res)
{
    //check if userName is already taken
    //if username !taken 
        //register the new user
});

router.post("/api/login", function(req, res)
{

});

router.post("/api/login-guest", function(req, res)
{
    //build object to turn into model instance
    var guestObject = 
    {
        userName: req.body.userName,
        token: GenerateToken()
    };

    // //create new instance of Guest
    var guestEntry = new Guest(guestObject);

    //save guest into Guest collection 
    guestEntry.save({}, function(error, doc)
    {
        if (error)
            console.log(error.message);
        else
            console.log("new guest saved");
    });

    //send token cookie to client
    res.cookie("token", guestObject.token);

    //send client to lobby page
    res.send({msg: "to the lobby!"});
    // res.redirect("/lobby");
});

router.put("/api/logout", function(req, res)
{

});

//Export router ==================================================
module.exports = router;