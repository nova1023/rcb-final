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
      selectedCardID: '',
      turnPhase: '',
      submittedCards: [],
      p1Score: 0,
      p2Score: 0,
      p3Score: 0,
      p4Score: 0,
    };


    // [handleChange, handleSubmit, handleChangeName, handleSubmitName, ]
    //   .each((elem) => this[elem] = this[elem].bind(this))
    this.sendName = this.sendName.bind(this);
    this.submitStoryTellerRes = this.submitStoryTellerRes.bind(this);
    this.submitCard = this.submitCard.bind(this);
    this.submitVote = this.submitVote.bind(this);
    this.sendReadyForNextTurn = this.sendReadyForNextTurn.bind(this);
    this.fillHand = this.fillHand.bind(this);
    this.showClue = this.showClue.bind(this);
    this.startVoting = this.startVoting.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.handleChangeClue = this.handleChangeClue.bind(this);
    this.handleChangeSelectedCard = this.handleChangeSelectedCard.bind(this);
    

    // Socket.io Event Listeners
    //----------------------------------------------------------------------------------------
    // receive an array of strings with the card numbers
    socket.on("cardsDealt", this.fillHand);

    // receive the clue that the storyteller submitted as a text string
    socket.on("relayClue", this.showClue);

    // receive an array of cards that everyone played
    socket.on("relayCards", this.startVoting);

    // receive who voted for what players total points if game is over.
    socket.on("turnResults", this.displayResults)

    //FOR TESTING receving nextTurn data
    socket.on("nextTurn", function(data){
          console.log(data);
      });

    //FOR TESTING receiving gameOver data
    socket.on("gameOver", function(data){
          console.log("received game over");
          console.log(data);
      });
  }

  handleChangeClue(event){
    this.setState({ clue: event.target.value });
  }

  handleChangeSelectedCard(event){
    this.setState({ selectedCardID: event.target.value });
  }

  // Sets the player's Number, Hand, and Storyteller from the received data.
  fillHand(cardsDealt){
    console.log("fillHand", cardsDealt);
    this.setState({
      whoIsStoryTeller: cardsDealt.storyTeller,
      myPlayerNumber: cardsDealt.playerNumber,
      myHand: cardsDealt.cards,
      turnPhase: 'storyTellerSubmits'
    });
  }

  showClue(data){
    console.log("relayClue--", data);
    this.setState({
      clue: data,
      turnPhase: 'playersSubmitCards'
    });
  }

  startVoting(data){
    console.log("relayCards--", data);
    this.setState({
      submittedCards: data,
      turnPhase: 'playersSubmitVotes'
    });
  }

  displayResults(data){
    console.log("turnResults--", data);
    this.setState({
      p1Score: data[0].currentScore,
      p2Score: data[1].currentScore,
      p3Score: data[2].currentScore,
      p4Score: data[3].currentScore,
      turnPhase: 'readyForNextTurn'
    })
  }

  // Sending Data to the server through socket.emit
  //--------------------------------------------------------------------------------
  sendName(name){
    socket.emit("playerJoined", name);
    console.log("sent name");
  }

  submitStoryTellerRes(event) {
    event.preventDefault();
    let cardID = this.state.selectedCardID;
    let clueText = this.state.clue;

    var data = {
      cardID: cardID,
      clueText: clueText
    };
    socket.emit("storyTellerClue", data);
    console.log("sent storyTeller selections");
  }

  // submitStoryTellerRes(cardID, clueText) {
  //   var data = {
  //     cardID: cardID,
  //     clueText: clueText
  //   };
  //   socket.emit("storyTellerClue", data);
  //   console.log("sent storyTeller selections");
  // }

  submitCard(event) {
    event.preventDefault();
    let cardID = this.state.selectedCardID;
    let playerNumber = this.state.myPlayerNumber;

    socket.emit("submitCard", {cardID:cardID, belongsTo:playerNumber});
    console.log("Sent Player's card choice.");
    this.setState({
      turnPhase: 'sentCard'
    });
  }

  submitVote(event) {
    event.preventDefault();
    let cardID = this.state.selectedCardID;
    let playerNumber = this.state.myPlayerNumber;

    socket.emit("submitVote", {cardID: cardID, playerNumber: playerNumber});
    console.log("Sent Player's vote choice");
    this.setState({
      turnPhase: 'sentVote'
    });
  }

  sendReadyForNextTurn() {
    console.log("Sent readyForNextTurn");
    this.setState({
      turnPhase: 'sentReady'
    });
    socket.emit("nextTurn", true);
  }
  //===========================================================================================

  componentDidMount(){
    this.sendName("player1");
  }

  componentDidUpdate(){
    console.log("App.js state--", this.state);
  }

  render() {

   
    return (
      <div className="App container-fluid" style={AppContainerStyling}>        
          
          <div className='row'>
            <div className='col-xs-12'>
              <GameRoom 
                gameState={this.state}
                handleChangeClue={this.handleChangeClue}
                handleChangeSelectedCard={this.handleChangeSelectedCard}
                submitStoryTellerRes={this.submitStoryTellerRes}
                submitCard={this.submitCard}
                submitVote={this.submitVote}
                sendReadyForNextTurn={this.sendReadyForNextTurn}
              />
            </div>
          </div>

      </div>
    );
  }
}

export default App;