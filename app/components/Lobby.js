import React, { Component } from 'react';
import LobbyView from './panels/LobbyView';
import LobbyChat from './panels/LobbyChat';
import MessageBox from './panels/MessageBox';

const LobbyContainerStyling = {
	height: '100vh',
	width: '100vw',
	overflow: 'hidden',

}

class Lobby extends Component {
  render() {
    return (
    	<div className="container-fluid">
    		<div className="LobbyContainer row" style={LobbyContainerStyling}>
    			<LobbyView />
    			<LobbyChat />
    			<MessageBox
    				Message={'Just checking to see if it works!'}
    			/>
    		</div>
    	</div>
		)  
  }
}

export default Lobby;