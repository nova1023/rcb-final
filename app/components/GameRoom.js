import React, { Component } from 'react';
import TableView4 from './panels/TableView4';
import PlayerOptions from './panels/PlayerOptions';
import ChatView from './panels/ChatView';
import ChatInput from './panels/ChatInput';

class GameRoom extends Component {


	render() {
		// this.numberOfTables;

		// if (numberOfPlayers === 4) {
		// 	this.numberOfTables = <TableView4 />			
		// } else {
		// 	this.numberOfTables = <TableView5 />
		// }


		return(
			<div>
				<div className="col-xs-12 ViewPort">
					<h3>ViewPort</h3>
					{/*this.numberOfTables*/}
					<TableView4 />
					<PlayerOptions />

				</div>
				<div className="col-xs-12 Chat">
					<h3>Chat</h3>
					<ChatView />
					<ChatInput />
				</div>
			</div>
		)
	}
}

export default GameRoom;
