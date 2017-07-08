/*
TODO list:
*/
//Dependencies ====================================================
var CardDeck = require("./deck.js");

//Game class ======================================================
function Game(io)
{
    //Instance Variables ------------------------------------------
    this.io = io;
    this.players = [];
    this.cardDeck = CardDeck(50);    //returns array ['1', '2', ...]
    this.cardsPlayedThisTurn = [];
    this.deadPile = [];
    this.connectedPlayerCount = 0;  // tracks players exit/disconnect game.
    this.gameStarted = false;       // tracks if game has started.
    this.room = "";                 // socket room associated with game instance.
    this.gameOver = false;          // flag to check if game is over from socket.js                
    this.storyTeller = 
    {
        id: "",
        index: undefined,
        playerNumber: undefined
    };

    //Methods -----------------------------------------------------
    this.FindPlayersCard = function(playerNumber = this.storyTeller.playerNumber)
    {
        for (var card in this.cardsPlayedThisTurn)
        {
            if (this.cardsPlayedThisTurn[card].belongsTo === playerNumber)
                return this.cardsPlayedThisTurn[card];
        }
    };

    this.FindPlayerByNumber = function(playerNumber = this.storyTeller.playerNumber)
    {
        for (var player in this.players)
        {
            if (this.players[player].playerNumber === playerNumber)
                return this.players[player];
        }
    };

    this.ShuffleCardDeck = function(shuffleTimes = 1, array = this.cardDeck)
    {
        while (shuffleTimes > 0)
        {
            //swap card at current index with card at random index
            for (var index = 0; index < array.length; index++)
            {
                var targetIndex = Math.floor(Math.random() * array.length);

                //swap
                var temp = array[index];
                array[index] = array[targetIndex];
                array[targetIndex] = temp;
            }
            shuffleTimes--;
        }
    };

    this.SetStoryTeller = function()
    {
        //if it's a new game or current story teller is last player in array
        if (this.storyTeller.index == undefined || this.storyTeller.index === this.players.length - 1)
        {
            //current StoryTeller becomes player at position 0 
            this.storyTeller.id = this.players[0].socketID;
            this.storyTeller.index = 0;
            this.storyTeller.playerNumber = 1;
        }
        else
        {
            this.storyTeller.index++;
            this.storyTeller.playerNumber++;
            this.storyTeller.id = this.players[this.storyTeller.index].socketID;
        }
    };

    this.DealCards = function(cardAmount = 6)
    {
        //set the StoryTeller for the turn
        this.SetStoryTeller();
        //Below line for TESTING 
        console.log(this.storyTeller);

        for (var index = 0; index < this.players.length; index++)
        {
            //each player gets cardAmount of cards
            for (var card = 0; card < cardAmount; card++)
                this.players[index].cardsInHand.push(this.cardDeck.pop());

            //emit cards to current player
            io.to(this.players[index].socketID).emit("cardsDealt",
            {
                storyTeller: this.storyTeller.playerNumber,
                cards: this.players[index].cardsInHand,
                playerNumber: this.players[index].playerNumber
            });

            //testing 
            console.log("player " + (index + 1) + " cards");
            console.log(this.players[index].cardsInHand);
        }
    };    

    this.CheckAllPlayersSubmittedCards = function()
    {
        for (var index = 0; index < this.players.length; index++)
        {
            //if the current player has not submitted a card
            if (!this.players[index].hasSubmittedCard)
                return false;
        }

        //only reached if all players have submitted a card
        return true;
    };

    this.CheckAllPlayersVoted = function()
    {
        for (var index = 0; index < this.players.length; index++)
        {
            //storyTeller does not vote
            if (this.players[index].playerNumber === this.storyTeller.playerNumber)
                continue;
            //if current player has not voted
            else if (!this.players[index].hasVoted)
                return false;
        }

        //only reached if all non storytellers have voted
        return true;
    };

    this.CheckForWinner = function()
    {
        for (var index = 0; index < this.players.length; index++)
        {
            if (this.players[index].currentPoints > 9)
                return true;
        }

        return false;
    };

    this.NonStoryTellersPlusTwoPoints = function()
    {
        for (var player in this.players)
        {
            //non-StoryTellers
            if (this.players[player].playerNumber !== this.storyTeller.playerNumber)
                this.players[player].currentPoints += 2;
        }
    };

    this.NonStoryTellersPointPerVoteReceived = function()
    {
        //iterate through array of players
        for (var index = 0; index < this.players.length; index++)
        {
            //non-StoryTellers
            if (this.players[index].playerNumber !== this.storyTeller.playerNumber)
            {
                //find their card
                var card = this.FindPlayersCard(this.players[index].playerNumber);

                //increment points per vote
                if (card.votedForBy !== undefined)
                    this.players[index].currentPoints += card.votedForBy.length;
            }
        }
    };

    this.CorrectGuessersPlusThreePoints = function()
    {
        var storyTellerCard = this.FindPlayersCard();
        for (var index = 0; index < storyTellerCard.votedForBy.length; index++)
        {
            var player = this.FindPlayerByNumber(storyTellerCard.votedForBy[index]);
            player.currentPoints += 3;
        }
    };

    this.CalculateResults = function()
    {
        var storyTellerCard = this.FindPlayersCard();

        //if nobody selected the StoryTellers card
        if (storyTellerCard.votedForBy === undefined)
        {
            this.NonStoryTellersPlusTwoPoints(); 
            this.NonStoryTellersPointPerVoteReceived();
        }
        //if everyone selected the StoryTellers card
        else if (storyTellerCard.votedForBy.length === this.players.length - 1)
            this.NonStoryTellersPlusTwoPoints();
        //some selected StoryTeller's card
        else
        {
            var storyTeller = this.FindPlayerByNumber();
            storyTeller.currentPoints += 3;
            this.CorrectGuessersPlusThreePoints();
            this.NonStoryTellersPointPerVoteReceived();
        }
    };

    this.GetCardsPlayedIDS = function()
    {
        var cards = this.cardsPlayedThisTurn.map(function(currentCard)
        {
            return { cardID: currentCard.cardID };
        });
        return cards;
    };

    this.GetTurnResultsArray = function()
    {
        console.log("sending turn results");
        var turnResults = [];

        for (var index = 0; index < this.players.length; index++)
        {
            turnResults.push(
            {

                playerNumber: this.players[index].playerNumber,
                userName: this.players[index].userName,
                currentPoints: this.players[index].currentPoints
            });
        }
        return turnResults;
    };

    this.RefillPlayersCardHand = function(maxCardsInHand = 6)
    {
        for (var index = 0; index < this.players.length; index++)
        {
            var newCard = this.cardDeck.pop();

            //store card in hand
            this.players[index].cardsInHand.push(newCard);

            console.log("player " + this.players[index].playerNumber + "'s refilled hand.");
            console.log(this.players[index].cardsInHand);

            //emit players newly refilled hand and StoryTeller
            io.to(this.players[index].socketID).emit("nextTurn",
            {
                belongsTo: this.players[index].playerNumber,
                cards: this.players[index].cardsInHand,
                storyTeller: this.storyTeller.playerNumber
            });
        }
    };

    this.HandleSubmitCard = function(cardReceived)
    {
        console.log("--------- inside HandleSubmitCard ----------");
        var player = this.FindPlayerByNumber(cardReceived.belongsTo);
        var card = player.RemoveCardFromHand(cardReceived.cardID);

        if (card !== false)
        {
            this.cardsPlayedThisTurn.push(cardReceived);
            player.hasSubmittedCard = true;
        }

        console.log(this.cardsPlayedThisTurn);
        console.log("--------------------------------");
    };

    this.HandleSubmitVote = function(voteObject)
    {   
        for (var index = 0; index < this.cardsPlayedThisTurn.length; index++)
        {
            var currentCard = this.cardsPlayedThisTurn[index];

            //find the matching card in cardsPlayedThisTurn
            if (currentCard.cardID === voteObject.cardID)
            {
                //if it doesnt' have a .votedForBy property, initialize it
                if (currentCard.votedForBy === undefined)
                    currentCard.votedForBy = [];

                currentCard.votedForBy.push(voteObject.playerNumber);
                console.log(this.cardsPlayedThisTurn);
                console.log("---------------------------");

                //set player's vote to true
                var player = this.FindPlayerByNumber(voteObject.playerNumber);
                player.hasVoted = true;
            }
        }
    };

    this.StartNextTurn = function()
    {
        //check if game is over.
        //TODO: check for a tie
        if (this.cardDeck.length < this.players.length || this.CheckForWinner())
        {    
            this.gameOver = true;
            io.in(this.room).emit("gameOver", this.GetTurnResultsArray());
        }    
        else
        {
            //move cards played this turn to dead pile
            while (this.cardsPlayedThisTurn.length > 0)
                this.deadPile.push(this.cardsPlayedThisTurn.pop());

            //set the new StoryTeller
            this.SetStoryTeller();

            //Set all players boolean values back to false
            for (var index = 0; index < this.players.length; index++)
            {
                this.players[index].hasSubmittedCard = false;
                this.players[index].hasVoted = false;
            }

            this.RefillPlayersCardHand();
        }
    };

    // If all players have submitted 'nextTurn' returns true, else returns false.
    this.CheckPlayersNextTurn = function()
    {
        var flag = true;     

        for (var index = 0; index < this.players.length; index++)
        {
            if (!this.players[index].nextTurnSubmitted)
                flag = false;
        }

        if(flag)
        {
           // resets property value to false 
           for (var index = 0; index < this.players.length; index++)
            {
                this.players[index].nextTurnSubmitted = false;               
            }            
            
            return true; 
        }

        return false;
    };
}

//Export the Game constructor ===============================================
module.exports = Game;









