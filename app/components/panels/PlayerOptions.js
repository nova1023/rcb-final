import React, { Component } from 'react';
import Menu from './panelsChildren/Menu';
import Score from './panelsChildren/Score';
import PlayerAvatar from './panelsChildren/PlayerAvatar';
import Hand from './panelsChildren/Hand';
import Emotes from './panelsChildren/Emotes';

class PlayerOptions extends Component {
	render() {
		return (
			<div>
				<div className='col-xs-12'>
					<div className='col-xs-3'>
						<Menu />
						<Score />
					</div>

					<div className='col-xs-6'>
						<PlayerAvatar />
					</div>

					<div className='col-xs-3'>
						<Hand />
						<Emotes />
					</div>
				</div>
			</div>
		)
	}
}

export default PlayerOptions;