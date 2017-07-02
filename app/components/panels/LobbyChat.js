import React, { Component } from 'react';
import ChatView from './ChatView';
import ChatInput from './ChatInput';

const LobbyChatStyling = {
	height: '40%',
	width: '100%',
	
}

class LobbyChat extends Component {
    render() {
        return (
            <div className="col-xs-12" style={LobbyChatStyling}>
                <ChatView />
                <ChatInput />
            </div>
		)  
    }
}

export default LobbyChat;