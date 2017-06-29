import React, { Component } from 'react';
import Menu from './panelsChildren/Menu';
import Score from './panelsChildren/Score';
import PlayerAvatar from './panelsChildren/PlayerAvatar';
import Hand from './panelsChildren/Hand';
import Emotes from './panelsChildren/Emotes';

const PlayerOptionsStyling = {
	background: 'lightblue',
	height: '10%',
}

const PlayerButtonStyling = {
	height: '100%',

}

class PlayerOptions extends Component {
	constructor(props){
		super(props);
		this.state = {
			gameState: {},

		}
	}

	componentDidUpdate(){
		console.log("PlayerOptions Component Updated");
    	if(this.state.gameState !== this.props.gameState){
			this.setState({gameState: this.props.gameState})
		} else {
			//do nothing
		}
		console.log("PlayerOptions", this.state);
	}

	render() {
		return (
			<div className='row' style={PlayerOptionsStyling}>
				<div className='col-xs-2' style={PlayerButtonStyling}>
					<Menu />
				</div>

				<div className='col-xs-2' style={PlayerButtonStyling}>
					<Score />
				</div>

				<div className='col-xs-4' style={PlayerButtonStyling}>
					<PlayerAvatar />
				</div>

				<div className='col-xs-2' style={PlayerButtonStyling}>
					<Hand gameState={this.state.gameState} />
				</div>

				<div className='col-xs-2' style={PlayerButtonStyling}>
					<Emotes />
				</div>
			</div>
		)
	}
}

export default PlayerOptions;