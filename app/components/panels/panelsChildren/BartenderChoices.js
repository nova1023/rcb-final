import React, { Component } from 'react';
import BartenderButton from './BartenderButton';

const BartenderChoicesStyling = {
    height: '10%',
    backgroundImage: 'url(/images/avatars/classy-fabric.png), url(/images/avatars/table-2.png)',

}

const ButtonContainerStyling = {
	backgroundColor: '#491b10',
	backgroundImage: 'url(/images/avatars/dark-wood.png)',
	height: '100%',

}

const ButtonStyling = {
	backgroundColor: '#491b10',
	backgroundImage: 'url(/images/avatars/dark-wood.png)',
	height: '100%',
	
}

const MenuItemStyling = {
	color: 'white',
	fontSize: '20px',
	backgroundColor: '#491b10',
	backgroundImage: 'url(/images/avatars/Wood-Button.jpg)',
	boxShadow: '0 5px 20px 2px black',
	width: '90%',
	height: '50%',
	margin: '15% 0 0 5%',
	textShadow: '-1px 1px 6px black',
	border: '1px solid #d19f64',
	paddingTop: '5%',
	paddingBottom: '5%'

}

let ReadyButtonStyling = {
	color: 'white',
	fontSize: '20px',
	backgroundColor: '#491b10',
	backgroundImage: 'url(/images/avatars/Wood-Button.jpg)',
	boxShadow: '0 5px 20px 2px black',
	width: '90%',
	height: '50%',
	margin: '15% 0 0 5%',
	textShadow: '-1px 1px 6px black',
	border: '1px solid #d19f64',
	paddingTop: '5%',
	paddingBottom: '5%'
}



class BartenderChoices extends Component {
	constructor(props){
		super(props);
		this.state = {

		};

		this.handleReadyClicked = this.handleReadyClicked.bind(this);
		this.changeReadyButton = this.changeReadyButton.bind(this);
		this.changeReadyButtonBack = this.changeReadyButtonBack.bind(this);
	}

	handleReadyClicked(){
		this.props.readyButtonClicked();
		this.changeReadyButton();
	}

	changeReadyButton(){
		ReadyButtonStyling = {
			color: '#18ff35',
			fontSize: '20px',
			backgroundColor: 'green',
			backgroundImage: 'url(/images/avatars/Wood-Button.jpg)',
			boxShadow: '0 5px 20px 2px black',
			width: '90%',
			height: '50%',
			margin: '15% 0 0 5%',
			textShadow: '-1px 1px 6px black',
			border: '1px solid #45ff38',
			paddingTop: '5%',
			paddingBottom: '5%'
		}
	}

	changeReadyButtonBack(){
		ReadyButtonStyling = {
			color: 'white',
			fontSize: '20px',
			backgroundColor: '#491b10',
			backgroundImage: 'url(/images/avatars/Wood-Button.jpg)',
			boxShadow: '0 5px 20px 2px black',
			width: '90%',
			height: '50%',
			margin: '15% 0 0 5%',
			textShadow: '-1px 1px 6px black',
			border: '1px solid #d19f64',
			paddingTop: '5%',
			paddingBottom: '5%'
		}
	}

	componentDidMount(){
		this.changeReadyButtonBack();
	}

    render() {
        return (
            <div className="col-xs-12" style={BartenderChoicesStyling}>
	            <div className='row text-center' style={ButtonContainerStyling}>    
	                <div className='col-xs-4' style={ButtonStyling} onClick={this.props.rulesButtonClicked}>
	                	<div style={MenuItemStyling}>Rules</div>
	                </div>
	                
	                <div className='col-xs-4' style={ButtonStyling} onClick={this.props.originsButtonClicked}>
	                	<div style={MenuItemStyling}>Origins</div>
	                </div>
	                
	                <div className='col-xs-4' style={ButtonStyling} onClick={this.handleReadyClicked}>
	                	<div style={ReadyButtonStyling}>Ready Up</div>	
	                </div>
            	</div>
            </div>		
        )  
    }
}

export default BartenderChoices;