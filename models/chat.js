
// Chat module.  Contains all Socket.io event and logic functions. 

module.exports = function(IO){

    let module= {};

    //send data object containing users message and username go all user in room.
    let relayChat = function(userName, message, room)
    {
        //data object        
        let data = {
            name: userName,
            message: message
        };

        IO.sockets.in(room).emit("relayMessage", data);
    };
    
    return module;
}
