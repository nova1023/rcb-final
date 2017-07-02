import React, { Component } from 'react';

const SpeechBubbleStyling = {
   position: 'absolute',
   left: '-10%',
   top: '10%',
   zIndex: '100',
   width: '42%',

}

class SpeechBubble extends Component {
    render() {
        return (
            <div>
                <img style={SpeechBubbleStyling} src='/images/avatars/complete/Avatar-Bubble-Speech-1.png' />
            </div>		
        )  
    }
}

export default SpeechBubble;