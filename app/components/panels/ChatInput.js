import React, { Component } from 'react';

import IO from 'socket.io-client';  
const socket = IO() ;

const chatInput = {
	height: '30%',
	width: '100%',
}

class ChatInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};

		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
		this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
	}

	handleMessageInputChange(event) {
		this.setState({message: event.target.value});
	}

	handleMessageSubmit(event) {
		event.preventDefault();
		console.log("Message Submitted." + this.state.message);
		socket.emit("sendMessage", this.state.message);
		this.setState({message: ""});
	}

	render() {
		return (

			<form onSubmit={this.handleMessageSubmit} id="message-form" style={chatInput}>
					<label>
						Message:
						<input
							style={chatInput} 
							type="text" 
							placeholder="message" 
							id="message" 
							value={this.state.message}
							onChange={this.handleMessageInputChange}
						/>
					</label>
					<input type="submit" value="Submit" id="chat-button"  />
			</form>
		)
	}
}

export default ChatInput;