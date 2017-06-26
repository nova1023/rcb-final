/*
    Dev notes: 

    array of users global minimum {socket.id, room, name, game}
    later - array of rooms/games
*/    

//Dependencies
const SocketIO = require("socket.io");
const Game = require("./game-classes/game");
const Player = require("./game-classes/player");

//ALL players in a room/game
var users = []; //used to look up name/id/room/game

// Test variables used used for single room/game
var playersInGame = 0;     // tracks number of players who are pushed to game1.players    
var numPlayers = 4;        // sets number of players in game
var nextTurnCheck = 0;    // tracks number of players who submitted 'nextTurn' event
var room = "Main";        


module.exports = function(server){

    const IO = SocketIO(server);
    const Chat = require("./chat")(IO);

    var game1 = new Game(IO); //Creates game instance.

    IO.on("connection", function(socket)
    {
        console.log("user connected", socket.id);

        //Socket events
        socket.on("playerJoined", playerJoined);
        socket.on("storyTellerClue", storyTellerClue);
        socket.on("submitCard", submitCard);
        socket.on("submitVote", submitVote);
        socket.on("nextTurn", nextTurn);
        socket.on("sendMessage", sendMessage);
        socket.on("disconnect", disconnect);

        
        //event callback functions
        //==============================================
        
        // joins player to room 
        // creates instance of player and sets player properties
        // pushes to game.players array
        function playerJoined(userName)
        {
            socket.join("Main");
            playersInGame++;
            
            var newPlayer = new Player(socket.id);
            newPlayer.userName = userName;
            newPlayer.room = "Main";
            newPlayer.game = "game1";
            newPlayer.playerNumber = playersInGame;
        
            users.push(newPlayer);
            //Line below for TESTING
            console.log("a player joined: " + newPlayer.userName);

            if(playersInGame <= numPlayers)
                game1.players.push(newPlayer);

            if(playersInGame === numPlayers)
            {
                game1.ShuffleCardDeck();
                game1.DealCards();
            }            
        }

        //---------------------------------------

        function storyTellerClue(data)
        {            
            data.belongsTo = game1.storyTeller.playerNumber;
            game1.HandleSubmitCard(data);
            IO.sockets.in("Main").emit("relayClue", data.clueText);
        }

        //---------------------------------------
       

        function submitCard(data)
        {

            var player = game1.FindPlayerByNumber(data.belongsTo);     

            data.belongsTo = currentPlayerNumber;
            game1.HandleSubmitCard(data);

            game1.cardsPlayedThisTurn.push(data);            
            player.hasSubmittedCard = true;

            if(game1.CheckAllPlayersSubmittedCards())
            {    
                game1.ShuffleCardDeck(1, game1.cardsPlayedThisTurn);
                IO.sockets.in("Main").emit("relayCards", game1.cardsPlayedThisTurn);
            }    
        }

        //---------------------------------------

        function submitVote(data)
        {
            var currentPlayerNumber = getUserByID(socket.id).playerNumber;
            var card = game1.FindPlayersCard(data.belongsTo);
            
            if(!card.hasOwnProperty("votedForBy"))
            {    
                card.votedForBy = [];
            }
            
            card.votedForBy.push(currentPlayerNumber);

            if(game1.CheckAllPlayersVoted())
            {
                game1.CalculateResults();
                 
                IO.sockets.in("Main").emit("turnResults", game1.GetTurnResultsArray());
            }    
        }

        //---------------------------------------

        function nextTurn(data)
        {
            nextTurnCheck++;

            if(nextTurnCheck === numPlayers)
            {
                game1.StartNextTurn();
            }    
        }

        //-------------------------------------

        function sendMessage(message)
        {
            var currentUser = getUserByID(socket.id);
            
            if(currentUser !== false)
                Chat.relayMessage(currentUser.userName, message, currentUser.room);
            else
                console.log('User not found!');
        }

        //--------------------------------------
        
        function disconnect()
        {
            console.log("user disconnected");
        }

     });


}//END module.exports

//Searches users array for user by socketID. If found returns user in users array else returns false.
function getUserById(socketID)
{
    for(var i = 0; i < users.length; i++)
    {
        if(users[i].socketID == socketID)
            return users[i];
    }    
    
    return false;
}
