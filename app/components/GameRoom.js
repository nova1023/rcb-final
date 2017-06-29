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
			players: {},

		}
	}

	componentDidUpdate() {
		if(this.state.players !== this.props.players){
			this.setState({players: this.props.players})
		} else {
			//do nothing
		}	
	}

	render() {

		return(
			<div className='row' style={GameRoomStyling}>
				<div className="col-xs-12 ViewPort" style={ViewPortStyling}>
					<TableView4 />
					<PlayerOptions />
				</div>
				<div className="col-xs-12 Chat" style={ChatStyling}>
					<ChatView />
					<ChatInput />
				</div>
			</div>
		)
	}
}

export default GameRoom;
