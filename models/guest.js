//Dependencies =====================================================
const Mongoose = require("mongoose");

//Create Schema ====================================================
var guestSchema = new Mongoose.Schema(
{
    userName: 
    {
        type: String,
        trim: true,
        required: "Must have a userName"
    },
    token:
    {
        type: String,
        validate: [
            function(token)
            {
                return (token.length  === 25);
            },
            "Token length incorrect"
        ]
    },
});

//Save Guest Schema model ==========================================
var guest = Mongoose.model("Guest", guestSchema);

//Export Guest model ===============================================
module.exports = guest;