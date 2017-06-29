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
    // var guestEntry = new Guest(guestObject);

    // guestEntry.save({}, function(error, doc)
    // {
    //     if (error)
    //         console.log(error.message);
    //     else
    //         console.log("new guest saved");
    // });

    res.send({msg: "hopefully guest was saved"});
});

router.put("/api/logout", function(req, res)
{

});

//Export router ==================================================
module.exports = router;