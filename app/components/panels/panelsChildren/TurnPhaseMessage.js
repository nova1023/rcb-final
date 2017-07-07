import React, { Component } from 'react';

const TurnPhaseMessageStyling = {
  width: '320px',
  height: '305px',
  fontSize: '30px',
  position: 'fixed',
  top: '0',
  margin: '0 auto',

}

class TurnPhaseMessage extends Component {
  constructor(props){
    super(props);
    this.state = {
   
    };
  }

  componentDidMount(){
    this.props.swipedDown();
  }

  show(){

  }

  hide(){

  }

  handleClick(){

  }

  render() {
    return (
      <div className='TurnPhaseMessage text-center' style={TurnPhaseMessageStyling}>
        <p>You are the story teller for this turn!</p>
      </div>
    )
  }
}

export default TurnPhaseMessage;