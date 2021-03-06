import React, { Component } from 'react';
import './App.css';
import { Route, Link, Redirect } from 'react-router-dom';

import GameRoom from './components/GameRoom.js';

// import IO from 'socket.io-client';  
// const socket = IO() ;

const AppContainerStyling = {
  // height:'100vh',
  // width: '100vw',
  // margin: '0 auto'
  backgroundImage: 'url(/images/avatars/complete/Wood-bar-3-sideways.png)',
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
      turnPhase: 'welcome',
      submittedCards: [],
      p1Points: 0,
      p2Points: 0,
      p3Points: 0,
      p4Points: 0,
      p1UserName: 'player1',
      p2UserName: 'player2',
      p3UserName: 'player3',
      p4UserName: 'player4',
      fireRedirect: false,
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
    this.nextTurn = this.nextTurn.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.backToLobby = this.backToLobby.bind(this);
    this.gameOver = this.gameOver.bind(this);
    
    let socket = this.props.socket;
    console.log('Props', this.props);
    console.log('socket var',socket);
    // Socket.io Event Listeners
    //----------------------------------------------------------------------------------------
    // receive an array of strings with the card numbers
    socket.on("cardsDealt", this.fillHand);

    // receive the clue that the storyteller submitted as a text string
    socket.on("relayClue", this.showClue);

    // receive an array of cards that everyone played
    socket.on("relayCards", this.startVoting);

    // receive who voted for what players total points if game is over.
    socket.on("turnResults", this.displayResults);

    //FOR TESTING receving nextTurn data
    socket.on("nextTurn", this.nextTurn);

    // when the game is over
    socket.on("gameOver", this.gameOver);

    // when a player disconnects
    socket.on("exitGame", this.exitGame);
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

  nextTurn(data){
    console.log("nextTurn", data);
    this.setState({
      whoIsStoryTeller: data.storyTeller,
      myHand: data.cards,
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
      p1Points: data[0].currentPoints,
      p1UserName: data[0].userName,
      p2Points: data[1].currentPoints,
      p2UserName: data[1].userName,
      p3Points: data[2].currentPoints,
      p3UserName: data[2].userName,
      p4Points: data[3].currentPoints,
      p4UserName: data[3].userName,
      turnPhase: 'readyForNextTurn'
    });
  }

  exitGame(){
    
    this.setState({turnPhase: 'exitGame'});
    console.log("Game is ending.", this.state.turnPhase);
  }

  backToLobby(){
    let socket=this.props.socket;
    console.log("Going back to lobby");
    this.setState({fireRedirect: true});
    socket.emit("exitGame");
  }

  gameOver(){
    this.setState({turnPhase: 'gameOver'});
    console.log("The game is over, somebody won!");
  }

  // Sending Data to the server through socket.emit
  //--------------------------------------------------------------------------------
  sendName(name){
    let socket = this.props.socket;
    socket.emit("playerJoined", name);
    socket.emit("joinGame");
    console.log("sent name");
  }

  submitStoryTellerRes(event) {
    event.preventDefault();
    let socket = this.props.socket;
    let cardID = this.state.selectedCardID;
    let clueText = this.state.clue;
    if (this.state.clue === '' || this.state.selectedCardID === '') {
      alert("Please type in a clue or card number from your hand.");
    }
    else {
    var data = {
      cardID: cardID,
      clueText: clueText
    };
    socket.emit("storyTellerClue", data);
    console.log("sent storyTeller selections");
    }
  }

  submitCard(event) {
    event.preventDefault();
    let socket = this.props.socket;
    let cardID = this.state.selectedCardID;
    let playerNumber = this.state.myPlayerNumber;
    if (this.state.selectedCardID === '') {
      alert("Please type in a card number from your hand.");
    }
    else {
    socket.emit("submitCard", {cardID:cardID, belongsTo:playerNumber});
    console.log("Sent Player's card choice.");
    this.setState({
      turnPhase: 'sentCard',
      selectedCardID: ''
    });
    }
  }

  submitVote(event) {
    event.preventDefault();
    let socket = this.props.socket;
    let cardID = this.state.selectedCardID;
    let playerNumber = this.state.myPlayerNumber;
    if (cardID === '') {
      alert("Please type the card number you think belongs to the Storyteller.");
    }
    else {
    socket.emit("submitVote", {cardID: cardID, playerNumber: playerNumber});
    console.log("Sent Player's vote choice");
    this.setState({
      turnPhase: 'sentVote'
    });
    }
  }

  sendReadyForNextTurn() {
    let socket = this.props.socket;
    console.log("Sent readyForNextTurn");
    this.setState({
      turnPhase: 'sentReady'
    });
    socket.emit("nextTurn", true);
  }
  //===========================================================================================

  componentDidMount(){
    console.log("App.js has mounted.")
    // this.sendName("player1");
    this.sendReadyForNextTurn();
  }

  componentDidUpdate(){
    console.log("App.js state--", this.state);
  }

  render() {

    if (this.state.fireRedirect === true) {
      return <Redirect to='/lobby' />

    } else {
   
    return (
      <div className="App container-fluid" style={AppContainerStyling}>        
              <GameRoom 
                gameState={this.state}
                handleChangeClue={this.handleChangeClue}
                handleChangeSelectedCard={this.handleChangeSelectedCard}
                submitStoryTellerRes={this.submitStoryTellerRes}
                submitCard={this.submitCard}
                submitVote={this.submitVote}
                sendReadyForNextTurn={this.sendReadyForNextTurn}
                exitGame={this.exitGame}
                backToLobby={this.backToLobby}
                socket={this.props.socket}
              />
      </div>
    );
  }}
}

export default App;