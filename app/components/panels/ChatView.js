import React, { Component } from 'react';
import Velocity from 'velocity-animate';

const chatBox = {
	height: '70%',
	width: '95%',
	backgroundColor: 'black',
	margin: '0 auto',
	fontSize: '20px',
	color: 'white',
	overflow: 'auto',

}

class ChatView extends Component {
	constructor(props){
		super(props);
		this.state ={
			storedMessages: [
			{name: 'Zim', message: 'I WILL DESTROY YOU ALL!!!1!'},
			{name: 'Urr', message: 'I WILL DESTROY this box of cupcakes.'}
			]

		};

		this.storeRelayedMessage = this.storeRelayedMessage.bind(this);
		this.displayMessages = this.displayMessages.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);

		let socket = this.props.socket;

		socket.on("relayMessage", this.storeRelayedMessage);
	}

	storeRelayedMessage(data){
		let messageArray = this.state.storedMessages;
		messageArray.push(data);
		console.log("Added a new message.", messageArray);
		this.scrollToBottom();
		this.setState({storedMessages: messageArray});
	}

	displayMessages(){
		console.log("displayMessages called");
		let storedMessages = this.state.storedMessages;
		
		return storedMessages.map((data, index)=> <div ref={data.name + index} key={index}>{data.name + ": " + data.message}</div>)
	}

	scrollToBottom(){
		console.log("scrollToBottom called");
		this.refs.chatBox.scrollTop = this.refs.chatBox.scrollHeight;
	}

	componentDidUpdate(){
		this.scrollToBottom();
	}

	render() {

		let messagesToDisplay = this.displayMessages();
		// let storedMessages = this.state.storedMessages;

		return (

			<div ref='chatBox' style={chatBox}>
				{messagesToDisplay}
			</div>

		)
	}
}

export default ChatView;


// {todos.map((message) => <Item key={message} message={message} />)}