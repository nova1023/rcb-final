//Dependencies
const SocketIO = require("socket.io");
const Game = require("./game-classes/game");
const Player = require("./game-classes/player");

//ALL players in a room/game
var allPlayersMap = new Map(); //used to look up player by socket.id
const GameSize = 2;        
var gamesMap = new Map();
var playersQueue = [];       

module.exports = function(server){

    // Dependencies
    const IO = SocketIO(server);
    const Chat = require("./chat")(IO);

    IO.on("connection", function(socket)
    {
        socket.removeAllListeners();
        console.log("user connected", socket.id);

        //Socket events
        socket.on("playerJoined", playerJoined);
        socket.on("joinGame", joinGame);
        socket.on("storyTellerClue", storyTellerClue);
        socket.on("submitCard", submitCard);
        socket.on("submitVote", submitVote);
        socket.on("nextTurn", nextTurn);
        socket.on("sendMessage", sendMessage);
        socket.on("disconnect", disconnect);      
        socket.on("exitGame", exitGame);
      
        //event callback functions
        //==============================================
        
        // joins player to room 
        // creates instance of player and sets player properties
        function playerJoined(userName)
        {
            // joins player to 'Main' chat room in lobby
            socket.join("Main");           
            
            var newPlayer = new Player(socket.id);
            newPlayer.userName = userName;
            newPlayer.room = "Main";
                
            allPlayersMap.set(socket.id, newPlayer);
            
console.log("a player joined: " + newPlayer.userName, socket.id);//TEST CODE
               
        }

        //--------------------------------------
        
        // Enqueues user to 'playerQueue'. If enough user in 'playerQueue' for a game,
        // instantiates a new game with players and stores game in 'gamesMap' 
        function joinGame()
        {
            //enqueues player
            playersQueue.unshift(allPlayersMap.get(socket.id));

            //if enough players for game, instantiates a new game and poplulates with players.
            if(playersQueue.length >= GameSize)
            {

console.log("\nGame Created");//TEST CODE 

                // creates name for new game based on number of games (e.g. game1, game2,...)
                var gameName = "game" + (gamesMap.size + 1);
console.log("gameName:", gameName);//TEST CODE                
                // instantiates new game and assigns room
                var newGame = new Game(IO)
                newGame.room = gameName;

                // Creates key-value pair of gameName-newGame
                gamesMap.set(gameName, newGame);

                // populates game with players
                for (var i = 0; i < GameSize; i++)
                {   
                    var player = playersQueue.pop();
                    player.game = gameName; //game name and room name are same
                    player.room = gameName;
                    player.playerNumber = i+1;

                    newGame.players.push(player);
                    newGame.connectedPlayerCount++;

                    socket.leave("Main"); 
                    socket.join(gameName);
                }

                IO.sockets.in(gameName).emit('joinGame'); 
            }
        }

        //---------------------------------------

        function storyTellerClue(data)
        {   
            // gets game from player.
            var gameName = allPlayersMap.get(socket.id).game
            var game = gamesMap.get(gameName);

            data.belongsTo = game.storyTeller.playerNumber;            
            game.HandleSubmitCard(data);
            IO.sockets.in(game.room).emit("relayClue", data.clueText);
        }

        //---------------------------------------
       

        function submitCard(data)
        {
            // gets game from player.
            var gameName = allPlayersMap.get(socket.id).game
            var game = gamesMap.get(gameName);

            game.HandleSubmitCard(data);

            if(game.CheckAllPlayersSubmittedCards())
            {    
                game.ShuffleCardDeck(1, game.cardsPlayedThisTurn);
                IO.sockets.in(game.room).emit("relayCards", game.GetCardsPlayedIDS());
            }    
        }

        //---------------------------------------

        function submitVote(data)
        {
            // gets game from player.
            var gameName = allPlayersMap.get(socket.id).game
            var game = gamesMap.get(gameName);
            
            game.HandleSubmitVote(data);

            if(game.CheckAllPlayersVoted())
            {
                game.CalculateResults();
                IO.sockets.in(game.room).emit("turnResults", game.GetTurnResultsArray());
            }    
        }

        //---------------------------------------

        function nextTurn(data)
        {           
            // gets game from user.
            var player =  allPlayersMap.get(socket.id);
            var gameName = player.game;
            var game = gamesMap.get(gameName);

            //tracks when users submit.
            player.nextTurnSubmitted = true;

            //checks if all players sumbitted 'nextTurn' 
            if(game.CheckPlayersNextTurn())
            {
                // start game if not started
                if(game.gameStarted === false)
                {

console.log("\n", game.room, "STARTED\n");//TEST CODE

                    game.gameStarted = true;
                    game.ShuffleCardDeck();
                    game.DealCards();                    
                }
                else
                {
                    game.StartNextTurn();
                }
            }         
        }

        //-------------------------------------
        
        // Handles player chat messages
        function sendMessage(message)
        {
            var player = allPlayersMap.get(socket.id);           
            Chat.relayMessage(player.userName, message, player.room);         
        }
        
        //--------------------------------------
        
        // Removes player from game when exits. If game has no player removes game from 'gameMap'.
        function exitGame()
        {
            var player =  allPlayersMap.get(socket.id);
            var gameName = player.game;            
            var game = gamesMap.get(gameName);

            game.connectedPlayerCount--;

            if(game.connectedPlayerCount === 0)
                gamesMap.delete(game.room)      // room is also game name.

            socket.leave(game.room);
            socket.join("Main");
            player.room = "Main";
            player.game = null;
           
            socket.emit("exitGame");
        }
       
        //--------------------------------------
        
        // When user disconnects, removes from game and allPlayersMap
        function disconnect()
        {            
            var player = allPlayersMap.get(socket.id);
            removeFromPlayersQueue(socket.id);

            // If 'player' not 'undefined'.
            // This is need because player may be connected but not have 'joinPlayed'
            // and be in 'allPlayersMap' resulting in player being 'undefined'.
            if(player)
            {       
                var gameName = player.game;     
                var game = gamesMap.get(gameName);

                if(game)
                {                   
                    game.connectedPlayerCount--;

                    if(game.connectedPlayerCount === 0) 
                        gamesMap.delete(game.room)      // room is also game name. 
                }
            
                allPlayersMap.delete(socket.id);
            }         
        }

    });// IO.on

}//END module.exports

//Removes player by socketID from playersQueue
function removeFromPlayersQueue(socketID)
{
    for(var i = 0; i < playersQueue.length; i++)
    {
        if(playersQueue[i].socketID == socketID)
        {
            playersQueue.splice(i,1);
            return;
        }    
    }    
}