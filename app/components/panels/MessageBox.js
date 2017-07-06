import React, { Component } from 'react';
import Velocity from 'velocity-animate';

const MessageBoxStyling = {
    position: 'absolute',
    height: '20%',
    width: '90%',
    top: '30%',
    left: '5%',
    backgroundColor: 'rgba(0, 0, 20, .9)',
    border: '3px solid grey',
    outline: '3px solid black',
    color: 'white',
    textShadow: '-1px 1px 6px black',
    fontSize: '20px',
    paddingLeft: '2%',
    paddingRight: '2%',

}

class MessageBox extends Component {
    constructor(props){
        super(props);
        this.state ={

        };

        this.hide = this.hide.bind(this);
    }

    hide() {
        console.log("Hide Called");
        Velocity(this.refs.MessageBox, {
            opacity: '0',
            duration: '500',
            height: '0',
            width: '0',
        }).then(this.setState({visible:false}))
    }

    render() {

        let Message = this.props.Message;

        return (
            <div ref='MessageBox' className="col-xs-12" style={MessageBoxStyling} onClick={this.hide}>
                {Message}
            </div>		
        )  
    }
}

export default MessageBox;