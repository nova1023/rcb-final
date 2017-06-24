import React, { Component } from 'react';

const chatInput = {
	height: '35px',
	width: '400px',
}

class ChatInput extends Component {
	render() {
		return (

			<form id="message-form">
					<strong>Message:</strong> <input style={chatInput} type="text" placeholder="message" id="message"></input>
					<button id="chat-button"><strong>Chat</strong></button>
			</form>

		)
	}
}

export default ChatInput;