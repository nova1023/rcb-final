//Dependencies ================================================
const Mongoose = require("mongoose");

//Create user Schema ==========================================
var userSchema = new Mongoose.Schema(
{
    userName: 
    {
        type: String,
        trim: true,
        unique: true,
        required: "A username is required"
    },
    password: 
    {
        type: String,
        trim: true,
        required: "Password is required"
    },
    token:
    {
        type: String
    }
});

//Save user model =============================================
var user = Mongoose.model("User", userSchema);

//Export user model ===========================================
module.exports = user;