import React, { Component } from 'react';

const portraitStyling = {
	backgroundImage: 'url(/images/avatars/bar-bg-2.png)'
}

const decorationStyling = {
	backgroundColor: 'green'
}

class PortraitView extends Component {
	render() {
		return (
			<div>
				<div className="col-xs-12 SinglePortrait" style={portraitStyling}>
					<h1>Avatar</h1>
					<img src="/images/avatars/complete/Kana-1.png"></img>
				</div>
				<div style={decorationStyling}>
					<h1>Decoration</h1>
				</div>
			</div>
		)
	}
}

export default PortraitView;