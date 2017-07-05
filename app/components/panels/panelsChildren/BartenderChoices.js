import React, { Component } from 'react';
import BartenderButton from './BartenderButton';

const BartenderChoicesStyling = {
    height: '20%',
    backgroundImage: 'url(/images/avatars/classy-fabric.png), url(/images/avatars/table-2.png)',

}

class BartenderChoices extends Component {
    render() {
        return (
            <div className="col-xs-12" style={BartenderChoicesStyling}>
	            <div className='row'>    
	                <div className='col-xs-3'>
	                	<BartenderButton
	                		ButtonImage={'/images/avatars/BartenderButton-Ready-On.png'}
	                	/>
	                </div>
	                
	                <div className='col-xs-3 col-xs-offset-1'>
	                	<BartenderButton
	                		ButtonImage={'/images/avatars/BartenderButton-Ready-Off.png'}
	                	/>
	                </div>
	                
	                <div className='col-xs-3 col-xs-offset-1'>
	                	<BartenderButton
	                		ButtonImage={'/images/avatars/BartenderButton-Ready-On.png'}
	                	/>
	                </div>
            	</div>
            </div>		
        )  
    }
}

export default BartenderChoices;