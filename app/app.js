import React, { Component } from 'react';
import './App.css';

import GameRoom from './components/GameRoom.js';

import IO from 'socket.io-client';  
const socket = IO() ;

const AppContainerStyling = {
  height:'100vh',
  width: '100vw',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whoIsStoryTeller: 0,
      myPlayerNumber: 0,
      myHand: [],
      clue: '',
      submittedCards: [],
      playerScores:{
        1: 0,
        2: 0,
        3: 0,
        4: 0
      }
    };


    // [handleChange, handleSubmit, handleChangeName, handleSubmitName, ]
    //   .each((elem) => this[elem] = this[elem].bind(this))
    this.sendName = this.sendName.bind(this);
    this.submitStoryTellerRes = this.submitStoryTellerRes.bind(this);
    this.submitCard = this.submitCard.bind(this);
    this.submitVote = this.submitVote.bind(this);
    this.sendReadyForNextTurn = this.sendReadyForNextTurn.bind(this);
    this.fillHand = this.fillHand.bind(this);

    // Socket.io Event Listeners
    //----------------------------------------------------------------------------------------
    // receive an array of strings with the card numbers
    socket.on("cardsDealt", this.fillHand);

    // receive the clue that the storyteller submitted as a text string
    socket.on("relayClue", showClue);

    // receive an array of cards that everyone played
    socket.on("relayCards", startVoting);

    // receive who voted for what players total points if game is over.
    socket.on("turnResults", displayResults)

    //FOR TESTING receving nextTurn data
    socket.on("nextTurn", function(data)
      {
          console.log(data);
      });

    //FOR TESTING receiving gameOver data
    socket.on("gameOver", function(data)
      {
          console.log("received game over");
          console.log(data);
      });
    }

  // Sets the player's Number, Hand, and Storyteller from the received data.
  fillHand(cardsDealt){
    console.log("fillHand", cardsDealt);
    this.setState({
      whoIsStoryTeller: cardsDealt.storyTeller,
      myPlayerNumber: cardsDealt.playerNumber,
      myHand: cardsDealt.cards
    });
  }

  showClue(data){
    this.setState({clue: data});
  }

  startVoting(data){
    this.setState({submittedCards: data});
  }

  displayResults(data){
    this.setState({
      playerScores[1] = data[0].currentScore,
      playerScores[2] = data[1].currentScore,
      playerScores[3] = data[2].currentScore,
      playerScores[4] = data[3].currentScore
    })
  }

  // Sending Data to the server through socket.emit
  //--------------------------------------------------------------------------------
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

  submitVote(cardID, playerNumber) {
    socket.emit("submitVote", {cardID: cardID, playerNumber: playerNumber});
  }

  sendReadyForNextTurn() {
    socket.emit("nextTurn", "readyForNextTurn");
  }
  //===========================================================================================

  render() {

   
    return (
      <div className="App container-fluid" style={AppContainerStyling}>        
          
          <div className='row'>
            <div className='col-xs-12'>
              <GameRoom players={this.state.players}/>
            </div>
          </div>

      </div>
    );
  }
}

export default App;