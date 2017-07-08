import React, { Component } from 'react';
import Velocity from 'velocity-animate';

const MessageBoxStyling = {
    position: 'absolute',
    height: '20%',
    width: '308px',
    top: '30%',
    // left: '10%',
    backgroundColor: 'rgba(0, 0, 20, .9)',
    border: '3px solid grey',
    outline: '3px solid black',
    color: 'white',
    textShadow: '-1px 1px 6px black',
    fontSize: '20px',
    paddingLeft: '2%',
    paddingRight: '2%',
    opacity: '0',
    margin: '0 auto',

}

class MessageBox extends Component {
    constructor(props){
        super(props);
        this.state ={
            isTalking: false,

        };

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.clicked = this.clicked.bind(this);
        this.setMessage = this.setMessage.bind(this);
    }

    show(){
        console.log("Show Called");
        Velocity(this.refs.MessageBox, {
            opacity: '1',
            duration: '500',
            height: '0',
            width: '0',
        })
    }

    hide() {
        console.log("Hide Called");
        Velocity(this.refs.MessageBox, {
            opacity: '0',
            duration: '500',
            height: '0',
            width: '0',
        })
    }

    clicked(){
        this.hide();
    }

    setMessage(){
        let messageState = this.props.messageState;

        switch(messageState){
            case 'welcome':
                this.show();
                return 'Welcome to the Cloak Inn Tavern';
            break;
                
            case 'rules':
                this.show();
                return 'The goal of the game is to get 9 points first.';
            break;
            
            case 'origins':
                this.show();
                return 'Welcome to the Cloak Inn Tavern';
            break;
            
            case 'ready':
                this.show();
                return "Ready for a game? OK. I'll let the others know.";
            break;

            default:
                this.show();
                return 'Well, this is unexpected.'
        }
    }

    render() {

        let Message = this.setMessage();

        return (
            <div ref='MessageBox' className="col-xs-12" style={MessageBoxStyling} onClick={this.clicked}>
               {Message}
            </div>		
        )  
    }
}

export default MessageBox;