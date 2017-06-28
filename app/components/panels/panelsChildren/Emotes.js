import React, { Component } from 'react';

const PlayerButtonsStyling = {
	border: '1px solid red',
	width: '100%',
	height: '100%',

}

const PlayerButtonWrapper = {
	height: '100%',

}

class Emotes extends Component {

	render() {
		return (
			<div className='row' style={PlayerButtonWrapper}> 
				<div className='dropup' style={PlayerButtonWrapper}>
					<div className='col-xs-12 dropdown-toggle' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style={PlayerButtonsStyling}>
						E
					</div>
						<div className="col-xs-12 dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
					    <img className='col-xs-3' src="/images/emotes/wink-face.png" />
					    <img className='col-xs-3' src="/images/emotes/wink-face.png" />
					    <img className='col-xs-3' src="/images/emotes/wink-face.png" />
					    <img className='col-xs-3' src="/images/emotes/wink-face.png" />
					  </div>
				</div>
			</div>
		)
	}
}

export default Emotes;

