// Dependencies ====================================================
const Express = require("express"),
    GenerateToken = require("./helper-code/token-generator.js");

// global variables ================================================
var router = Express.Router();

//Require schemas =================================================
var User = require("../models/user.js"),
    Guest = require("../models/guest.js");

// Login related routes ============================================
router.post("/api/register", function(req, res)
{
    
});

router.post("/api/login", function(req, res)
{

});

router.post("/api/login-guest", function(req, res)
{
    //create a new cookie to store
    var token = GenerateToken();
    res.send(token);
    //create a new guest using username and cookie

    //save guest model instance into the database
});

router.put("/api/logout", function(req, res)
{

});

//Export the router ================================================
module.exports = router;

