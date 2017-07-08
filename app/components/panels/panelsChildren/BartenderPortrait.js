import React, { Component } from 'react';
import SpeechBubble from './SpeechBubble';

const BartenderPortraitStyling = {
    height: '80%',
    backgroundImage: 'url(/images/avatars/bar-bg-2.png)',
    backgroundSize: '120%',
    backgroundPosition: '10% 32%',

}

const BartenderAvatarStyling = {
	position: 'relative',
	bottom: '20%',
	left: '15%',

}

const CounterStyling = {
	height: '10%',
	// position: 'absolute',
	bottom: '0',

}

class BartenderPortrait extends Component {
    render() {
        return (
            <div className="row">
            <div className="col-xs-12" style={BartenderPortraitStyling}>
                <img src='/images/avatars/complete/Candace-1.png' style={BartenderAvatarStyling} />
            </div>
            <div className="col-xs-12">
                <img src='/images/avatars/complete/Wood-bar-3.png' style={CounterStyling} />
            </div>
            </div>	
        )  
    }
}

export default BartenderPortrait;