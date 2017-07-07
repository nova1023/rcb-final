//Dependencies
const SocketIO = require("socket.io");
const Game = require("./game-classes/game");
const Player = require("./game-classes/player");

//Global Variables
var allPlayersMap = new Map(); //Stores all players.  Used to look up player game/room by socket.id.
const GameSize = 4;        
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
            newPlayer.socket = socket;
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
            var player = allPlayersMap.get(socket.id);

            //checks if player already submited 'joinGame'. (i.e. player.game is not null )
            if(!player.game)
            {    
                //temporary assignment for above if conditional.
                player.game = "game pending";
                
                //enqueues player
                playersQueue.unshift(player);

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

                        player.socket.leave("Main"); 
                        player.socket.join(gameName);      
                    }

                    IO.sockets.in(gameName).emit('joinGame');
                }
            }           
        }

        //---------------------------------------

        function storyTellerClue(data)
        {   
            var player = allPlayersMap.get(socket.id);

            // gets game from player.
            var gameName = player.game
            var game = gamesMap.get(gameName);

            data.belongsTo = game.storyTeller.playerNumber;            
            game.HandleSubmitCard(data);

            IO.sockets.in(game.room).emit("relayClue", data.clueText);
            Chat.relayMessage("Storyteller Clue", data.clueText, game.room); 
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

            if(game)
            {    

                game.connectedPlayerCount--;

                if(game.connectedPlayerCount === 0)
                    gamesMap.delete(game.room)      // room is also game name.

                socket.leave(game.room);
                socket.join("Main");
                player.room = "Main";
                player.game = null;
           }
            
            socket.emit("exitGame");
        }
       
        //--------------------------------------
        
        // When user disconnects, removes from game and allPlayersMap
        function disconnect()
        { 
            console.log("user disconnected", socket.id);           
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
                   // Checks if game is over.
                   // If game is over game room is kept open so players can chat unill all players
                   // exit or disconnect.
                   // If game is not over, 'exitGame' is emmited to all players in room to kick them back to lobby
                   // and game is deleted.  This is needed if player disconnects in middle a game.
                   if(game.gameOver)
                   {
                        game.connectedPlayerCount--;

                        if(game.connectedPlayerCount === 0) 
                            gamesMap.delete(game.room);      // room is also game name.                             
                   }
                   else
                   {                   
                        IO.sockets.in(game.room).emit('exitGame');
                        
                        // Sets all players room back to "Main" and game to null.
                        // Unjoins players from game back to lobby room.
                        for(var key in game.players)
                        {
                            var player = game.players[key];
                            var room = player.room;
                           
                            player.socket.leave(room); 
                            player.socket.join("Main");

                            player.room = "Main";
                            player.game = null; 
                        }    

                        gamesMap.delete(game.room);
                   }       
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