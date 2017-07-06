import React, { Component } from 'react';
import BartenderButton from './BartenderButton';

const BartenderChoicesStyling = {
    height: '20%',
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
	width: '80%',
	height: '50%',
	margin: '15% 0 0 10%',
	textShadow: '-1px 1px 6px black',
	border: '1px solid #d19f64',
	paddingTop: '3%',

}

class BartenderChoices extends Component {
    render() {
        return (
            <div className="col-xs-12" style={BartenderChoicesStyling}>
	            <div className='row text-center' style={ButtonContainerStyling}>    
	                <div className='col-xs-4' style={ButtonStyling} onClick={this.props.rulesButtonClicked}>
	                	<p style={MenuItemStyling}>Rules</p>
	                </div>
	                
	                <div className='col-xs-4' style={ButtonStyling} onClick={this.props.originsButtonClicked}>
	                	<p style={MenuItemStyling}>Origins</p>
	                </div>
	                
	                <div className='col-xs-4' style={ButtonStyling} onClick={this.props.readyButtonClicked}>
	                	<p style={MenuItemStyling}>Ready Up</p>	
	                </div>
            	</div>
            </div>		
        )  
    }
}

export default BartenderChoices;