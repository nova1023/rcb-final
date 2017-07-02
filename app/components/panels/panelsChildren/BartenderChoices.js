import React, { Component } from 'react';

const BartenderChoicesStyling = {
    height: '100%',
    backgroundImage: 'url(/images/avatars/classy-fabric.png), url(/images/avatars/table-2.png)',

}

class BartenderChoices extends Component {
    render() {
        return (
            <div className="col-xs-5" style={BartenderChoicesStyling}>
                BartenderChoices
            </div>		
        )  
    }
}

export default BartenderChoices;