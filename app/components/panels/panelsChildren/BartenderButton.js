import React, { Component } from 'react';

const BartenderButtonStyling = {
	width: '100%',

}

class BartenderButton extends Component {
    render() {

    	let ButtonImage = this.props.ButtonImage;

        return (
            <div className="col-xs-12">
                <img src={ButtonImage} style={BartenderButtonStyling} />
            </div>		
        )  
    }
}

export default BartenderButton;