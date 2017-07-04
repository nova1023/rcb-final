/*
TODO: 
    - User can create an account
    - User can sign into an existing account
    - User can log out
    - User can sign in using a guest account
*/
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
Passport.use("sign-in", new LocalStrategy(function(username, password, done)
{
    User.findOne({username: username}, function(error, user)
    {
        console.log(user);
        if (error)
            return done(error);
        if (!user)
            return done(null, false, {message: "Incorrect username."});
        if (user.password !== password)
            return done(null, false, {message: "Incorrect password."});

        //user exists and passwords match
        return done(null, user);
    });
}));

Passport.serializeUser(function(user, done)
{
    done(null, user._id);
});

Passport.deserializeUser(function(userID, done)
{
    User.findOne({_id: userID}, function(error, user)
    {
        done(null, user);
    });
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
    // console.log(req.body);
    //check if userName is already taken
    User.findOne({username: req.body.username}, function(error, data)
    {
        //if username is available for registration
        if (data === null)
        {
            //check that passwords match
            if (req.body.password === req.body.passwordConfirm)
            {
                var token = GenerateToken();

                //create instance of User model
                var userEntry = new User(
                {
                    username: req.body.username,
                    password: req.body.password,
                    token: token
                });

                //save new user into database
                userEntry.save({}, function(error, doc)
                {
                    if (error)
                        console.log(error.message);
                    else
                        console.log("new user saved");
                });

                //write cookie 
                res.cookie("token", token);

                //send user to lobby
                res.send({msg: "to the lobby!"});
                //res.redirect("/lobby");
            }
            else
            {
                console.log("passwords do not match");
                //redirect back to landing
                res.redirect('/');
            }
        }
        else
        {
            console.log("Name is already taken");
            res.redirect('/');
        }
    });
});

router.post("/api/login", Passport.authenticate("sign-in", 
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
    //find user based on cookie
    User.update({token: req.cookies.token}, {$set: {token: ""}}, function(error, user)
    {
        if (error)
            console.log(error.message);
        else
            console.log("user logged out");
    });

    //remove cookie from client
    res.clearCookie("token");

    //send them to landing page
    res.send({msg: "to the landing page"});
    // res.redirect('/');
});

//Export router ==================================================
module.exports = router;