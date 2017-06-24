import React, { Component } from 'react';

const portraitStyling = {
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	height: '100%'
}

const decorationStyling = {
	backgroundColor: 'green',
	minHeight: '20%',
	maxHeight: '20%',
	position: 'absolute',
	bottom: '0',
	left: '0'
}

const avatarStyling = {
	width: '100%',
	minWidth: '100px',
	position: 'absolute',
	bottom: '20%',
	left: '0'
}

const PortraitWrapper = {
	height: '100%',

}

class PortraitView extends Component {
	render() {
		return (
			<div className='row' style={PortraitWrapper}>
				<div className="col-xs-12 SinglePortrait" style={portraitStyling}>
					<h1>Avatar</h1>
					<img src="/images/avatars/complete/Anankos-2.png" style={avatarStyling}></img>
				</div>
				<div style={decorationStyling}>
					<h1>Decoration</h1>
				</div>
			</div>
		)
	}
}

export default PortraitView;