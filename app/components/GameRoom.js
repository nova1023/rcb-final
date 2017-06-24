import React, { Component } from 'react';
import TableView4 from './panels/TableView4';
import PlayerOptions from './panels/PlayerOptions';
import ChatView from './panels/ChatView';
import ChatInput from './panels/ChatInput';

const GameRoomStyling = {
	height: '100vh',
	width: 'calc(100vw-100px)',

}

const ViewPortStyling = {
	height: '60%',
}

const ChatStyling = {
	height: '40%',
}
class GameRoom extends Component {


	render() {
		// this.numberOfTables;

		// if (numberOfPlayers === 4) {
		// 	this.numberOfTables = <TableView4 />			
		// } else {
		// 	this.numberOfTables = <TableView5 />
		// }


		return(
			<div style={GameRoomStyling}>
				<div className="col-xs-12 ViewPort" style={ViewPortStyling}>
					{/*this.numberOfTables*/}
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
