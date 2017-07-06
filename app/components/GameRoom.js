import React, { Component } from 'react';
import TableView4 from './panels/TableView4';
import PlayerOptions from './panels/PlayerOptions';
import ChatView from './panels/ChatView';
import ChatInput from './panels/ChatInput';

const GameRoomStyling = {
	height: '100vh',
	// width: '100vw',

}

const ViewPortStyling = {
	height: '60%',
	width: '100vw',
	



}

const ChatStyling = {
	height: '40%',
}

class GameRoom extends Component {
	constructor(props){
		super(props);
		this.state = {
			gameState: {},

		}
	}

	componentDidUpdate() {
		console.log("GameRoom Component Updated");
		if(this.state.gameState !== this.props.gameState){
			this.setState({gameState: this.props.gameState})
		} else {
			//do nothing
		}	
		console.log("GameRoom", this.state);
	}

	render() {

		return(
			<div className='row' style={GameRoomStyling}>
				<div className="col-xs-12 ViewPort" style={ViewPortStyling}>
					<TableView4 gameState={this.state.gameState} 
						handleChangeClue={this.props.handleChangeClue}
                		handleChangeSelectedCard={this.props.handleChangeSelectedCard}
                		submitStoryTellerRes={this.props.submitStoryTellerRes}
                		submitCard={this.props.submitCard}
                		submitVote={this.props.submitVote}
                		sendReadyForNextTurn={this.props.sendReadyForNextTurn}
                	/>
					<PlayerOptions gameState={this.state.gameState} />
				</div>
				<div className="col-xs-12 Chat" style={ChatStyling}>
					<ChatView socket={this.props.socket} />
					<ChatInput socket={this.props.socket} />
				</div>
			</div>
		)
	}
}

export default GameRoom;
