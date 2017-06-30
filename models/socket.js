//Dependencies
const SocketIO = require("socket.io");
const Game = require("./game-classes/game");
const Player = require("./game-classes/player");

//ALL players in a room/game
var users = []; //used to look up name/socketid/room/game
var numPlayers = 4;        
var room = "Main";
var gamesMap = new Map();
var playersQueue = [];
var runningGamesCount = 0;        


module.exports = function(server){

    const IO = SocketIO(server);
    const Chat = require("./chat")(IO);

    var game1 = new Game(IO); //Creates game instance.

    IO.on("connection", function(socket)
    {
        socket.removeAllListeners()
        console.log("user connected", socket.id);

        //Socket events
        socket.on("playerJoined", playerJoined);
        socket.on("storyTellerClue", storyTellerClue);
        socket.on("submitCard", submitCard);
        socket.on("submitVote", submitVote);
        socket.on("nextTurn", nextTurn);
        socket.on("sendMessage", sendMessage);
        socket.on("disconnect", disconnect);
        socket.on("joinGame", joinGame);
        socket.on("exitGame", exitGame);

        
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
            game1.HandleSubmitCard(data);

            if(game1.CheckAllPlayersSubmittedCards())
            {    
                game1.ShuffleCardDeck(1, game1.cardsPlayedThisTurn);
                IO.sockets.in("Main").emit("relayCards", game1.GetCardsPlayedIDS());
            }    
        }

        //---------------------------------------

        function submitVote(data)
        {
            console.log(" ------- inside socket.js submit vote -------");

            game1.HandleSubmitVote(data);

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
                nextTurnCheck = 0;
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
        
        function joinGame()
        {
            /*
                put user on playerQueue.
                


            */
        }

         //--------------------------------------
        
        function exitGame()
        {
            /*
                remove player from game room
                rejoin player to main room

                somehow check if game has any players.(add property to game)
                if game.players === 0;
                    re add to availible games array
                


            */
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
