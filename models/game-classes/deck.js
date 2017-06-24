// Generates and returns an ordered deck array (size deckSize) of cards.    
module.exports = function(deckSize){

    var deck = [];

    for(var i = 1; i <= deckSize ; i++)
    {
        deck.push(i.toString());
    }    

    return deck;
};