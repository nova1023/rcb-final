import React, { Component } from 'react';

const portraitStyling = {
	backgroundColor: 'black'
}

const PlayerAvatarStyling = {
	width: '100%',

}

const PlayerAvatarWrapper = {
	position: 'absolute',
	width: '100%',
	height: '200%',
	bottom: '0',
	border: '2px solid purple'
}

class PlayerAvatar extends Component {
	render() {
		return (
			<div className='row' style={PlayerAvatarWrapper}>
				<div className="col-xs-12 playerPortrait" style={portraitStyling}>
					<img src='/images/avatars/complete/Gaius-1.png' style={PlayerAvatarStyling}/>
				</div>
			</div>
		)
	}
}

export default PlayerAvatar;