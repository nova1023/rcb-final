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

class Menu extends Component {
	
	render() {
		return (
			<div className='row' style={PlayerButtonWrapper}>
				<div className='col-xs-12' style={PlayerButtonsStyling}>
					<img src='/images/avatars/complete/icon-menu.png' style={IconStyling} />
				</div>
			</div>
		)
	}
}

export default Menu;