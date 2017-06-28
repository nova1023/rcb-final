import React, { Component } from 'react';

const portraitStyling = {
	height: '100%'
}

const decorationStyling = {
	backgroundImage: 'url(/images/avatars/classy-fabric.png), url(/images/avatars/table-1.png)',
	minHeight: '20%',
	maxHeight: '20%',
	width: '300%',
	position: 'absolute',
	bottom: '0',
	left: '0'
}

const avatarStyling = {
	width: '50%',
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
					<img src="/images/avatars/complete/Anankos-2.png" style={avatarStyling}></img>
				</div>
				<div style={decorationStyling}>
				</div>
			</div>
		)
	}
}

export default PortraitView;