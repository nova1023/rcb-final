import React, { Component } from 'react';

const BartenderButtonStyling = {
	width: '100%',

}

class BartenderButton extends Component {
	constructor(props){
		super(props);
		this.state = {

		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		
	}

    render() {

    	let ButtonImage = this.props.ButtonImage;

        return (
            <div className="col-xs-12" onClick={this.handleClick}>
                <img src={ButtonImage} style={BartenderButtonStyling} />
            </div>		
        )  
    }
}

export default BartenderButton;