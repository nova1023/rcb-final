//Dependencies
const SocketIO = require("socket.io");
const Game = require("./game-classes/game");
const Player = require("./game-classes/player");

//ALL players in a room/game
var allPlayersMap = new Map(); //used to look up player by socket.id
const GameSize = 4;        
var gamesMap = new Map();
var playersQueue = [];
var runningGamesCount = 0;        

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
            
            //Line below for TESTING
            console.log("a player joined: " + newPlayer.userName);               
        }

        //--------------------------------------
        
        // Enqueues user to 'playerQueue'. If enough user in 'playerQueue' for a game,
        // instantiates a new game with players and stores game in 'gamesMap' 
        function joinGame()
        {
            //enqueues player
            playersQueue.unshift(allPlayersMap.get(socket.id));

            //if enough players for game, instantiates a new game and poplulates with players.
            if(playersQueue >= GameSize)
            {
                runningGamesCount++;

                // creates name for new game based on number of games (e.g. game1, game2,...)
                var gameName = "game" + runningGamesCount;
                
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
            var game = allPlayersMap.get(socket.id).game

            data.belongsTo = game.storyTeller.playerNumber;            
            game.HandleSubmitCard(data);
            IO.sockets.in(game.room).emit("relayClue", data.clueText);
        }

        //---------------------------------------
       

        function submitCard(data)
        {
            // gets game from player.
            var game = allPlayersMap.get(socket.id).game

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
            // gets game from user.
            var game = allPlayersMap.get(socket.id).game

            //tracks when users submit.
            game.nextTurnCount++;

            //checks if all players sumbitted 'nextTurn' 
            if(game.nextTurnCount.length === GameSize)
            {
                // start game if not started
                if(game.gameStarted === false)
                {
                    game.gameStarted = true;
                    game.ShuffleCardDeck();
                    game.DealCards();                    
                }
                else
                {
                    game.StartNextTurn();
                }

                // resets to zero
                game.nextTurnCount = 0;
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
            var game = allPlayersMap.get(socket.id).game;
            game.connectedPlayerCount--;

            socket.leave(game.room);
            socket.join("Main");
           
            socket.emit("exitGame");

            if(game.connectedPlayerCount === 0)
                gamesMap.remove(game.room)      // room is also game name.    
        }
       
        //--------------------------------------
        
        // When user disconnects, removes from game and allPlayersMap
        function disconnect()
        {
            console.log("user disconnected");

            var game = allPlayersMap.get(socket.id).game;
            game.connectedPlayerCount--;

            if(game.connectedPlayerCount === 0)
                gamesMap.remove(game.room)      // room is also game name.    

            allPlayersMap.remove(socket.id);
        }

     });


}//END module.exports

