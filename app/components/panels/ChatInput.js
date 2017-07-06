import React, { Component } from 'react';

//import IO from 'socket.io-client';  
//const socket = IO() ;

const chatInput = {
	height: '30%',
	width: '90%',
	margin: '0 auto'

}


class ChatInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};

		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
		this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
		this.readyForGame = this.readyForGame.bind(this);

		


	}

	handleMessageInputChange(event) {
		this.setState({message: event.target.value});
	}

	handleMessageSubmit(event) {
		let socket = this.props.socket;
		event.preventDefault();
		console.log("Message Submitted." + this.state.message);
		socket.emit("sendMessage", this.state.message);
		this.setState({message: ""});
	}

	readyForGame() {
		console.log("sending ready for game", this.props);
		let socket = this.props.socket
		socket.emit("joinGame");
	}

	render() {
		return (
			<div>
			<form onSubmit={this.handleMessageSubmit} id="message-form">

				<input
					style={chatInput} 
					type="text" 
					placeholder="Message" 
					id="message" 
					value={this.state.message}
					onChange={this.handleMessageInputChange}
					/>
				<input type="submit" value="Submit" id="chat-button" />
			</form>
			
			</div>
		)
	}
}

export default ChatInput;

// <form onSubmit={this.handleMessageSubmit} id="message-form" style={chatInput}>
// 					<label>
// 						Message:
// 						<input
// 							style={chatInput} 
// 							type="text" 
// 							placeholder="message" 
// 							id="message" 
// 							value={this.state.message}
// 							onChange={this.handleMessageInputChange}
// 						/>
// 					</label>
// 					<input type="submit" value="Submit" id="chat-button"  />
// 			</form>