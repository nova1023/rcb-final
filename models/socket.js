//Dependencies
const SocketIO = require("socket.io");
const Game = require("./game-classes/game");
const Player = require("./game-classes/player");

//ALL players in a room/game
var allPlayersMap = new Map(); //used to look up player by socket.id
const NumPlayers = 4;        
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

            newPlayer.playerNumber = playersInGame;
            /*
                put user on playerQueue.
                


            */
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
            // gets game from user.
            var game = allPlayersMap.get(socket.id).game

            //tracks when users submit.
            game.nextTurnCount++;

            //checks if all players sumbitted 'nextTurn' 
            if(game.nextTurnCount.length === NumPlayers)
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

        function sendMessage(message)
        {
            var currentUser = allPlayersMap.get(socket.id);
            
            if(currentUser !== false)
                Chat.relayMessage(currentUser.userName, message, currentUser.room);
            else
                console.log('User not found!');
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

