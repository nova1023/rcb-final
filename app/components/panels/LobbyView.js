import React, { Component } from 'react';
import BartenderChoices from './panelsChildren/BartenderChoices';
import BartenderPortrait from './panelsChildren/BartenderPortrait';

const LobbyViewStyling = {
    height: '60%',
    width: '100%',

}

class LobbyView extends Component {
    render() {
        return (
            <div className="col-xs-12" style={LobbyViewStyling}>
                <BartenderPortrait />
                <BartenderChoices
                    rulesButtonClicked = {this.props.rulesButtonClicked}
                    originsButtonClicked = {this.props.originsButtonClicked}
                    readyButtonClicked = {this.props.readyButtonClicked}
                    socket={this.props.socket}
                />
            </div>		
        )  
    }
}

export default LobbyView;