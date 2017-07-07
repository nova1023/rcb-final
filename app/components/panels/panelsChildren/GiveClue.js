import React, { Component } from 'react';

const PlayerButtonsStyling = {
  border: '1px solid red',
  width: '360px',
  height: '345px',
  marginLeft: '360px',


}

const PlayerButtonWrapper = {
  height: '100px',
  width: '100px',

}

const HideBulletPoints = {
  listStyleType: 'none',

}

class GiveClue extends Component {
  constructor(props){
    super(props);
    this.state = {
      clue:'',
      selectedCardID:'',

    }

    // this.submitStoryTellerRes = this.submitStoryTellerRes.bind(this);
    // this.handleChangeClue = this.handleChangeClue.bind(this);
    // this.handleChangeSelectedCard = this.handleChangeSelectedCard.bind(this);
  }

  // handleChangeClue(event){
  //   this.setState({ clue: event.target.value });
  // }

  // handleChangeSelectedCard(event){
  //   this.setState({ selectedCardID: event.target.value });
  // }

  // submitStoryTellerRes(event) {
  //   event.preventDefault();
  //   let cardID = this.state.selectedCardID;
  //   let clueText = this.state.clue;

  //   var data = {
  //     cardID: cardID,
  //     clueText: clueText
  //   };
  //   socket.emit("storyTellerClue", data);
  //   console.log("sent storyTeller selections");
  // }
  
  render() {
    return (
      <div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' data-toggle="modal" data-target="#giveClue" style={PlayerButtonsStyling}>
          S
        </div>

          <div className="modal fade" id="giveClue">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="pull-left">Submit a clue and a card</div>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> <span className="glyphicon glyphicon-remove"></span></button>
                </div>
          
              <div className="modal-body">
              
                <form onSubmit={this.props.submitStoryTellerRes}>
                  <label>
                    Enter Clue:
                    <input type="text" value={this.props.clue} onChange={this.props.handleChangeClue} />
                  </label>
                  <input type="text" value={this.props.selectedCardID} onChange={this.props.handleChangeSelectedCard} />
                </form>
                <button data-dismiss="modal" onClick={this.props.submitStoryTellerRes}>Submit</button>
     
              </div>

                <div className="modal-footer">
                  <div className="pull-left">
                  
                  </div>
                  <button className="btn-sm close" type="button" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default GiveClue;