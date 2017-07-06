import React, { Component } from 'react';
import LobbyView from './panels/LobbyView';
import LobbyChat from './panels/LobbyChat';
import MessageBox from './panels/MessageBox';
import { Route, Link, Redirect } from 'react-router-dom';

const LobbyContainerStyling = {
	height: '100vh',
	width: '100vw',
	overflow: 'hidden',

}

class Lobby extends Component {
	constructor(props){
		super(props);
		this.state = {
			fireRedirect: false,

		};

		this.handleRedirect = this.handleRedirect.bind(this);
		this.rulesButtonClicked = this.rulesButtonClicked.bind(this);
		this.originsButtonClicked = this.originsButtonClicked.bind(this);
		this.readyButtonClicked = this.readyButtonClicked.bind(this);

		let socket = this.props.socket;

		socket.on("joinGame", this.handleRedirect);

	}

	handleRedirect(){
		this.setState({fireRedirect: true})
	}

	rulesButtonClicked(){
		console.log("rulesButtonClicked");
	}

	originsButtonClicked(){
		console.log("originsButtonClicked");
	}

	readyButtonClicked(){
			console.log("readyButtonClicked");
	}

  render() {
  	if (this.state.fireRedirect === true) {
			return <Redirect to='/testingPage' />

		} else {
    return (
    	<div className="container-fluid">
    		<div className="LobbyContainer row" style={LobbyContainerStyling}>
    			<LobbyView
    				rulesButtonClicked = {this.rulesButtonClicked}
    				originsButtonClicked = {this.originsButtonClicked}
    				readyButtonClicked = {this.readyButtonClicked}
    			/>
    			<LobbyChat socket={this.props.socket} />
    			<MessageBox
    				Message={'Just checking to see if it works!'}
    			/>
    		</div>
    	</div>
		)  
  }}
}

export default Lobby;