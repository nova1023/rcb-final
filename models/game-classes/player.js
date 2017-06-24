//Player class
function Player(socketID)
{
    this.socketID = socketID;
    this.userName;
    this.playerNumber;
    this.cardsInHand = [];
    this.hasSubmittedCard = false;
    this.hasVoted = false;
    this.currentPoints = 0;
    this.game;
    this.room;


    //Looks for card of cardID in players cardsInHand.
    // If found removes card and returns card
    // If not found returns false
    this.RemoveCardFromHand = function(cardID)
    {
        for(var i = 0; i < this.cardsInHand; i++)
        {
            var currentCard = this.cardsInHand[i];
            
            if(currentCard.cardID == cardID)
            {
                this.cardsInHand.splice(i,1);
                return currentCard;
            } 
            return false;   
        }
    }

}

//export the Player class constructor
module.exports = Player;




