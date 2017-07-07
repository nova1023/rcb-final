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
			messageState: 'none',
			isReady: false,
			
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
		this.setState({messageState: 'rules'})
	}

	originsButtonClicked(){
		console.log("originsButtonClicked");
		this.setState({messageState: 'origins'})
	}

	readyButtonClicked(){
		console.log("readyButtonClicked");
		if (this.state.isReady === false){
			// this.setState({messageState: 'ready', isReady: true})
			console.log("sending ready for game", this.props);
			let socket = this.props.socket
			socket.emit("joinGame");
		} else {
			// Already Readied
		}
	}

	componentDidMount(){
		console.log("Lobby has mounted.");
		this.setState({messageState: 'welcome'})
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
    				socket={this.props.socket}
    			/>
    			<LobbyChat socket={this.props.socket} />
    			<MessageBox
    				messageState={this.state.messageState}
    			/>
    		</div>
    	</div>
		)  
  }}
}

export default Lobby;