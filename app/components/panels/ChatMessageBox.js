import React, { Component } from 'react';

const ChatMessageBoxStyling = {
	height: '40%',
	width: '100%',
    backgroundImage: 'url(/images/avatars/classy-fabric.png), url(/images/avatars/table-2.png)',

}

class ChatMessageBox extends Component {
    render() {
        return (
            <div className="col-xs-12" style={ChatMessageBoxStyling}>
                
            </div>
		)  
    }
}

export default ChatMessageBox;