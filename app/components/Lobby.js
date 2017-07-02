import React, { Component } from 'react';
import LobbyView from './panels/LobbyView';
import LobbyChat from './panels/LobbyChat';

const LobbyContainerStyling = {
	height: '100vh',
	width: '100vw',

}

class Lobby extends Component {
  render() {
    return (
    	<div className="container-fluid">
    		<div className="LobbyContainer row" style={LobbyContainerStyling}>
    			<LobbyView />
    			<LobbyChat />
    		</div>
    	</div>
		)  
  }
}

export default Lobby;