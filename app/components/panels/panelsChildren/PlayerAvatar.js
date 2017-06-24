import React, { Component } from 'react';

const portraitStyling = {
	backgroundColor: 'yellow'
}


class PlayerAvatar extends Component {
	render() {
		return (
			<div>
				<div className="col-xs-12 playerPortrait" style={portraitStyling}>
					<h1>PlayerAvatar</h1>
				</div>
			</div>
		)
	}
}

export default PlayerAvatar;