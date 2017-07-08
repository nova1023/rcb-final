import React, { Component } from 'react';

const PlayerButtonsStyling = {
	width: '80%',
  height: '80%',
  margin: '8% 0 0 10%',
  backgroundImage: 'url(/images/avatars/Wood-Button.jpg)',

}

const PlayerButtonWrapper = {
	height: '100%',

}

const IconStyling = {
  width: '100%',
  height: '100%',
}

class Emotes extends Component {

	render() {
		return (
			<div className='row' style={PlayerButtonWrapper}> 
				<div className='dropup' style={PlayerButtonWrapper}>
					<div className='col-xs-12 dropdown-toggle' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style={PlayerButtonsStyling}>
						<img src='/images/avatars/complete/icon-emote.png' style={IconStyling} />
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

