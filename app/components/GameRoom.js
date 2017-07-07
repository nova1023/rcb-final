import React, { Component } from 'react';
import TableView4 from './panels/TableView4';
import PlayerOptions from './panels/PlayerOptions';
import ChatView from './panels/ChatView';
import ChatInput from './panels/ChatInput';
import LobbyChat from './panels/LobbyChat';

const GameRoomStyling = {
	height: '100vh',
	width: '100vw',

}

const ViewPortStyling = {
	height: '60%',
	width: '100%',
	
}

const ChatStyling = {
	height: '40%',
	width: '100%',

}

class GameRoom extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}

	render() {

		return(
			<div className='row' style={GameRoomStyling}>
				<div className="col-xs-12 ViewPort" style={ViewPortStyling}>
					<TableView4 
						gameState={this.props.gameState} 
						handleChangeClue={this.props.handleChangeClue}
                		handleChangeSelectedCard={this.props.handleChangeSelectedCard}
                		submitStoryTellerRes={this.props.submitStoryTellerRes}
                		submitCard={this.props.submitCard}
                		submitVote={this.props.submitVote}
                		sendReadyForNextTurn={this.props.sendReadyForNextTurn}
                	/>
					<PlayerOptions gameState={this.props.gameState} />
				</div>
				<LobbyChat socket={this.props.socket} />
				
			</div>
		)
	}
}

export default GameRoom;
