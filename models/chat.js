// Chat module.  Used to relay chat messages via socket.io.

module.exports = function(IO){

    var module= {};

    //send data object containing user's message and username to all user in room.
    var relayMessage = function(userName, message, room)
    {
        //data object        
        var data = {
            name: userName,
            message: message
        };

        IO.sockets.in(room).emit("relayMessage", data);
    };
    
    return module;
}
