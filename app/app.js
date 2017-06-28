import React, { Component } from 'react';
import './App.css';

import GameRoom from './components/GameRoom.js';

import IO from 'socket.io-client';  
const socket = IO() ;

let playerNumber = 0;

// receive an array of strings with the card numbers
socket.on("cardsDealt", fillHand);

// receive a player number string, EG player1
socket.on("storyTellerSet", storyTellerSet);

// receive the clue that the storyteller submitted as a text string
socket.on("relayClue", showClue);


// receive an array of cards that everyone played
socket.on("relayCards", startVoting);

// receive who voted for what players total points if game is over.
socket.on("turnResults", displayResults)

function fillHand(cardsDealt) {
  console.log("fillHand", cardsDealt);
  playerNumber = cardsDealt.playerNumber;
  // var handDiv = $("<div>");
  // handDiv.addClass("col-xs-12 handDiv");
  // for(var i = 0; i < cardsDealt.cards.length; i++) {
  //   var card = $("<div>");
  //   card.addClass("col-xs-2 card");
  //   card.html(cardsDealt.cards[i]);

  //   $(".handDiv").append(card);
  // }
}

function storyTellerSet(storyTellerSet) {
  console.log("storyTellerSet", storyTellerSet);
  // var storyTellerDiv = $("<div>");
  // storyTellerDiv.addClass("col-xs-12 storyTellerDiv");
  // if (playerNumber === storyTellerSet) {
  //   var storyTellerText = $("<h2>");
  //   storyTellerText.addClass("text-center");
  //   storyTellerText.html("Player " + storyTellerSet + " is the storyteller for this round.");

  //   $(".storyTellerDiv").append(storyTellerText);
  // }
}

function showClue(relayClue) {
  console.log("showClue", relayClue);
  // var clueDiv = $("<div>");
  // clueDiv.addClass("col-xs-12 clueDiv");
  // if (relayClue) {
  //   var clueString = $("<h2>");
  //   clueString.addClass("text-center");
  //   clueString.html("The storyteller's clue is " + relayClue + ".");

  //   $(".clueDiv").append(clueString);
  // }
}

function startVoting(relayCards) {
  // console.log("startVoting", relayCards);
  // var votingHand = $("<div>");
  // votingHand.addClass("col-xs-12 votingHand");
  // for (var i = 0; i < relayCards.length; i++) {
  //   var pleaseVote = $("<h3>");
  //   pleaseVote.html("Please choose the card that belongs to the storyteller.");
  //   $(".votingHand").prepend(pleaseVote);
  //   var votingCards = $("<div>");
  //   votingCards.addClass("col-xs-2 votingCards");
  //   votingCards.html(relayCards[i].cardID)

  //   $(".votingHand").append(votingCards);
  // }
}

function displayResults(turnResults) {
  console.log("displayResults", turnResults);
  // var turnResultsDiv = $("<div>");
  // turnResultsDiv.addClass("col-xs-12 turnResultsDiv");
  // for (var i = 0; i < turnResults.length; i++) {
  //   var pointsDiv = $("<h3>");
  //   pointsDiv.html("Player " + turnResults[i].playerNumber + " has " + turnResultsDiv[i].currentPoints + ".");

  //   $(".turnResultsDiv").append(pointsDiv);
  // }
}

const AppContainerStyling = {
  height:'100vh',
  width: '100vw',

}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      name: '',
      clue: '',
      card: '',
      vote: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
    this.sendName = this.sendName.bind(this);
    this.handleChangeClue = this.handleChangeClue.bind(this);
    this.handleSubmitClue = this.handleSubmitClue.bind(this);
    this.handleChangeCard = this.handleChangeCard.bind(this);
    this.submitStoryTellerRes = this.submitStoryTellerRes.bind(this);
    this.submitCard = this.submitCard.bind(this);
    this.submitVote = this.submitVote.bind(this);
    this.handleChangeVote = this.handleChangeVote.bind(this);
    this.handleSubmitVote = this.handleSubmitVote.bind(this);
    this.buttonReadyNextTurn = this.buttonReadyNextTurn.bind(this);
    this.sendReadyForNextTurn = this.sendReadyForNextTurn.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeClue(event) {
    this.setState({clue: event.target.value});
  }

  handleChangeCard(event) {
    this.setState({card: event.target.value});
  }

  handleChangeVote(event) {
    this.setState({vote: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.value);
  }
  
  handleSubmitName(event) {
    event.preventDefault();
    this.sendName(this.state.name);
    console.log('A name was submitted: ' + this.state.name);
  }

  handleSubmitClue(event) {
    event.preventDefault();
    console.log('A clue was submitted: ' + this.state.clue);
    console.log('A card was submitted: ' + this.state.card);
    this.submitStoryTellerRes(this.state.card, this.state.clue);
  }

  handleSubmitCard(event) {
    event.preventDefault();
    this.submitCard(this.state.card, playerNumber);
    console.log('A card was submitted: ' + this.state.card);
    // this.submitCard(this.state.value, playerNumber);
  }

  handleSubmitVote(event) {
    this.submitVote(this.state.vote, playerNumber);
    event.preventDefault();
    console.log('A vote was submitted: ' + this.state.vote);
  }

  buttonClick()   {
     socket.emit("test", "hello button Clicked");
     console.log("button clicked");
  }

  buttonReadyNextTurn() {
    this.sendReadyForNextTurn();
    console.log("sent ready for next turn.")
  }

  sendName(name){
    socket.emit("playerJoined", name);
    console.log("sent name");
  }

  submitStoryTellerRes(cardID, clueText) {
    var data = {
      cardID: cardID,
      clueText: clueText
    };
    socket.emit("storyTellerClue", data);
    console.log("sent storyTeller selections");
  }

  submitCard(cardID, player) {
    socket.emit("submitCard", {cardID:cardID, belongsTo:player});
  }

<<<<<<< HEAD
  submitVote(cardID) {
    socket.emit("submitVote", {cardID: cardID, playerNumber: player});
=======
  submitVote(cardID, playerNumber) {
    socket.emit("submitVote", {cardID: cardID, playerNumber: playerNumber});
>>>>>>> development
  }

  sendReadyForNextTurn() {
    socket.emit("nextTurn", "readyForNextTurn");
  }

  render() {

   
    return (
      <div className="App container-fluid" style={AppContainerStyling}>
          
          <div className="row">
            <div className="col-xs-12">
              

              <div className="App-header">
                <h2>Welcome to React</h2>
              </div>
              
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>
              
              <button onClick={this.buttonClick}>socket test</button>
              
              <hr />
              
              <form onSubmit={this.handleSubmitName}>
                <label>
                  Name:
                  <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                </label>
                <input type="submit" value="Submit" />
              </form>

              <hr />

              <form onSubmit={this.handleSubmitClue}>
                <h3>Story Teller's Submissions</h3>
                <label>
                  Clue:
                  <input type="text" value={this.state.clue} onChange={this.handleChangeClue} />
                </label>
                <label>
                  Card:
                  <input type="text" value={this.state.card} onChange={this.handleChangeCard} />
                </label>
                <input type="submit" value="Submit" />
              </form>

              <hr />

              <form onSubmit={this.handleSubmitCard}>
              <h3>Player's Submissions</h3>
                <label>
                  Card:
                  <input type="text" value={this.state.card} onChange={this.handleChangeCard} />
                </label>
                <input type="submit" value="Submit" />
              </form>
              
              <form onSubmit={this.handleSubmitVote}>
                <label>
                  Vote:
                  <input type="text" value={this.state.vote} onChange={this.handleChangeVote} />
                </label>
                <input type="submit" value="Submit" />
              </form>

              <button onClick={this.buttonReadyNextTurn}>sendReadyForNextTurn</button>
            

            </div>
          </div>

          <hr />
          <hr />
          <hr />

          
          <div className='row'>
            <div className='col-xs-12'>
              <GameRoom />
            </div>
          </div>

      </div>
    );
  }
}

export default App;