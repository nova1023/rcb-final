import React, { Component } from 'react';
import ChatView from './ChatView';
import ChatInput from './ChatInput';

const LobbyChatStyling = {
	height: '40%',
	width: '100%',
    backgroundImage: 'url(/images/avatars/classy-fabric.png), url(/images/avatars/table-2.png)',

}

class LobbyChat extends Component {
    componentDidUpdate(){
        console.log("LobbyChat updated.");
    }
    render() {
        return (
            <div className="col-xs-12" style={LobbyChatStyling}>
                <ChatView socket={this.props.socket} />
                <ChatInput socket={this.props.socket} />
            </div>
		)  
    }
}

export default LobbyChat;