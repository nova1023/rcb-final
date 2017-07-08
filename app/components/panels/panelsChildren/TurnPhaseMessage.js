import React, { Component } from 'react';
import Velocity from 'velocity-animate';

const TurnPhaseMessageStyling = {
  width: '30%',
  // height: '30%',
  fontSize: '17px',
  position: 'relative',
  // top: '0',
  margin: '1% auto',
  backgroundColor: 'rgba(0, 0, 20, .9)',
  border: '3px solid grey',
  outline: '3px solid black',
  color: 'white',
  textShadow: '-1px 1px 6px black',
  // paddingLeft: '2%',
  // paddingRight: '2%',

}

const TurnPhasePromptText = {
  margin: '0'
}

class TurnPhaseMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
   
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  show(){
    Velocity(this.refs.TurnPhaseMessageDiv, {opacity:'1', duration: 500})
  }

  hide(){
    Velocity(this.refs.TurnPhaseMessageDiv, {opacity: '0', duration: 500})
  }

  handleClick(){
    console.log("TurnPhaseMessage has been clicked");
    this.hide();
  }

  componentDidMount(){
    console.log("TurnPhaseMessage has mounted");
    this.props.swipedUp();
  }

  render() {

    let Message = this.props.message;

    return (
      <div
      ref='TurnPhaseMessageDiv' 
      className='TurnPhaseMessage text-center' 
      style={TurnPhaseMessageStyling} 
      onClick={this.handleClick}>
        <p style={TurnPhasePromptText}>{Message}</p>
      </div>
    )
  }
}

export default TurnPhaseMessage;