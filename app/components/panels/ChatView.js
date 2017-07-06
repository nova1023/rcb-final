import React, { Component } from 'react';

const chatBox = {
	height: '70%',
	width: '95%',
	backgroundColor: 'black',
	margin: '0 auto',
	fontSize: '20px',
	color: 'white',
		
}

class ChatView extends Component {
	constructor(props){
		super(props);
		this.state ={
			storedMes:'None'

		};

		this.displayMes = this.displayMes.bind(this);

		let socket = this.props.socket;

		socket.on("relayMessage", this.displayMes);
	}

	displayMes(data){
		let name = data.name;
		let message = data.message;
		let oldMes = this.state.storedMes;

		this.setState({storedMes: oldMes + message})

	}

	render() {

		


		return (

			<div ref='chatBox' style={chatBox}>{this.state.storedMes}</div>

		)
	}
}

export default ChatView;