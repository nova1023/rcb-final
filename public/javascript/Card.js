// Card Object

// Debug Check
console.log("Card.js has loaded.");


class Card {
	constructor(cardID) {
		this.cardID = cardID;
		this.cardImage = ""+cardNumber+".png";
		this.cardBack = "cardBack.png";
		this.card = $(this);
	}

	flip() {
		this.card
			.velocity({rotateY:"180deg"});
	}

	draw() {
		this.card
			.velocity({});
	}

	play() {
		
	}

	shuffle() {

	}

	deal() {

	}

	addToHand() {

	}

	select() {

	}


}
