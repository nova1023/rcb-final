//Dependencies ================================================
const Mongoose = require("mongoose");

//Create user Schema ==========================================
var userSchema = new Mongoose.Schema(
{
    username: 
    {
        type: String,
        trim: true,
        unique: true,
        required: "Username is required"
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