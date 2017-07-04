// Dependenciess =================================================
const Express = require("express"),
    Passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    GenerateToken = require("./helper-code/token-generator.js");

// Variables =====================================================
var router = Express.Router();

//Bring in schemas ===============================================
const User = require("../models/user.js"),
    Guest = require("../models/guest.js");

//Passport login configuration =========================================
Passport.use(new LocalStrategy(function(username, password, done)
{
    User.findOne({username: username}, function(error, user)
    {
        // console.log(user);
        if (error)
            return done(error);
        if (!user)
            return done(null, false, {message: "Incorrect username."});
        if (user.password !== password)
            return done(null, false, {message: "Incorrect password."});

        return done(null, user);
    });
}));

Passport.serializeUser(function(user, done)
{
    done(null, user);
});

Passport.deserializeUser(function(user, done)
{
    done(null, user);
});

//Routing ========================================================
//for testing --------
router.get("/success", function(req, res)
{
    res.send({msg: "success"});
});

router.get("/failure", function(req, res)
{
    res.send({msg: "failure"});
});
//end for testing ---------

router.post("/api/register", function(req, res)
{
    //check if userName is already taken
    //if username !taken 
        //register the new user
});

router.post("/api/login", Passport.authenticate("local", 
{ 
    // successRedirect: '/lobby',
    successRedirect: "/success",
    // failureRedirect: '/'
    failureRedirect: "/failure"
}));

router.post("/api/login-guest", function(req, res)
{
    //build object to turn into model instance
    var guestObject = 
    {
        username: req.body.username,
        token: GenerateToken()
    };

    //create new instance of Guest
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
    //clear their cookie
    //send them to landing page
});

//Export router ==================================================
module.exports = router;