import React, { Component } from 'react';
import Menu from './panelsChildren/Menu';
import Score from './panelsChildren/Score';
import PlayerAvatar from './panelsChildren/PlayerAvatar';
import Hand from './panelsChildren/Hand';
import Emotes from './panelsChildren/Emotes';

const PlayerOptionsStyling = {
	backgroundColor: '#491b10',
	backgroundImage: 'url(/images/avatars/dark-wood.png)',
	height: '10%',
}

const PlayerButtonStyling = {
	height: '100%',

}

class PlayerOptions extends Component {
	constructor(props){
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
			<div className='row' style={PlayerOptionsStyling}>
				<div className='col-xs-2' style={PlayerButtonStyling}>
					<Menu />
				</div>

				<div className='col-xs-2' style={PlayerButtonStyling}>
					<Score gameState={this.props.gameState} />
				</div>

				<div className='col-xs-4' style={PlayerButtonStyling}>
					<PlayerAvatar />
				</div>

				<div className='col-xs-2' style={PlayerButtonStyling}>
					<Hand gameState={this.props.gameState} />
				</div>

				<div className='col-xs-2' style={PlayerButtonStyling}>
					<Emotes />
				</div>
			</div>
		)
	}
}

export default PlayerOptions;