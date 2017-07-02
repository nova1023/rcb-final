import React, { Component } from 'react';
import BartenderButton from './BartenderButton';

const BartenderChoicesStyling = {
    height: '100%',
    backgroundImage: 'url(/images/avatars/classy-fabric.png), url(/images/avatars/table-2.png)',

}

class BartenderChoices extends Component {
    render() {
        return (
            <div className="col-xs-5" style={BartenderChoicesStyling}>
                <div className='row'>
                	<BartenderButton
                		ButtonImage={'/images/avatars/BartenderButton-Ready-On.png'}
                	/>
                </div>
                
                <div className='row'>
                	<BartenderButton
                		ButtonImage={'/images/avatars/BartenderButton-Ready-Off.png'}
                	/>
                </div>
                
                <div className='row'>
                	<BartenderButton
                		ButtonImage={'/images/avatars/BartenderButton-Ready-On.png'}
                	/>
                </div>
            </div>		
        )  
    }
}

export default BartenderChoices;