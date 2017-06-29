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
      value: '',
      name: '',
      clue: '',
      card: '',
      vote: '',
      players: {
        1:{
          name: '',
          isStoryTeller: false,
          isDone: false,
          isMe: true,

        },
        2:{
          name: '',
          isStoryTeller: false,
          isDone: false,
          isMe: false,
        },
        3:{
          name: '',
          isStoryTeller: false,
          isDone: false,
          isMe: false,
        },
        4:{
          name: '',
          isStoryTeller: false,
          isDone: false,
          isMe: false,
        }
      }
    };


    // [handleChange, handleSubmit, handleChangeName, handleSubmitName, ]
    //   .each((elem) => this[elem] = this[elem].bind(this))
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
    this.sendName = this.sendName.bind(this);
    this.handleSubmitClue = this.handleSubmitClue.bind(this);
    this.handleSubmitCard = this.handleSubmitCard.bind(this);
    this.submitStoryTellerRes = this.submitStoryTellerRes.bind(this);
    this.submitCard = this.submitCard.bind(this);
    this.submitVote = this.submitVote.bind(this);
    this.handleSubmitVote = this.handleSubmitVote.bind(this);
    this.buttonReadyNextTurn = this.buttonReadyNextTurn.bind(this);
    this.sendReadyForNextTurn = this.sendReadyForNextTurn.bind(this);
    this.fillHand = this.fillHand.bind(this);

    // Socket.io Event Listeners
    //----------------------------------------------------------------------------------------
    // receive an array of strings with the card numbers
    socket.on("cardsDealt", this.fillHand);

    // receive a player number string, EG player1
    socket.on("storyTellerSet", storyTellerSet);

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

  storyTellerSet(storyTellerSet) {
  console.log("storyTellerSet", storyTellerSet); 
  }

  showClue(relayClue) {
    console.log("showClue", relayClue);
  }

  startVoting(relayCards) {
  }

  displayResults(turnResults) {
    console.log("displayResults", turnResults);
  }

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