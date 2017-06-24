import React, { Component } from 'react';

const chatBox = {
	margin: '0 auto',
	height: '350px',
	width: '350px',
	backgroundColor: 'black'
}

class ChatView extends Component {
	render() {
		return (

			<div style={chatBox}></div>

		)
	}
}

export default ChatView;