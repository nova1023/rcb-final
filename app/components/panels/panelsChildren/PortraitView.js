import React, { Component } from 'react';

const portraitStyling = {
	height: '100%'
}

const decorationStyling = {
	backgroundImage: 'url(/images/avatars/classy-fabric.png), url(/images/avatars/table-1.png)',
	minHeight: '10%',
	maxHeight: '10%',
	width: '300%',
	position: 'absolute',
	bottom: '0',
	left: '0'
}

const avatarStyling = {
	width: '70%',
	marginLeft: '15%',
	position: 'absolute',
	bottom: '10%',
	left: '0'
}

const PortraitWrapper = {
	height: '100%',

}

const playerNameStyling = {
	color: 'white',
	backgroundColor: 'blue',
	position: 'absolute',
	fontSize: '30px',
	top: '4%',
	left: '25%',
	textAlign: 'center',
	width: '50%',
}

class PortraitView extends Component {
	constructor(props){
		super(props);
		this.state = {

		};
	}

	render() {

		let imgSrc = "/images/avatars/complete/" + this.props.avatar + "-1.png"

		return (
			<div className='row' style={PortraitWrapper}>
				<div className="col-xs-12 SinglePortrait" style={portraitStyling}>
					<img src={imgSrc} style={avatarStyling}></img>
				</div>
				<div style={decorationStyling}>
				</div>
			</div>
		)
	}
}

export default PortraitView;