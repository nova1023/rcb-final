import React, { Component } from 'react';

const PlayerButtonsStyling = {
  border: '1px solid red',
  width: '100%',
  height: '100%',

}

const PlayerButtonWrapper = {
  height: '100px',
  width: '100px',

}

const HideBulletPoints = {
  listStyleType: 'none',

}

class SubmitVote extends Component {
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
        <div className='col-xs-12' data-toggle="modal" data-target="#scoreBoard" style={PlayerButtonsStyling}>
          S
        </div>

          <div className="modal fade" id="scoreBoard">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="pull-left">SubmitVote</div>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> <span className="glyphicon glyphicon-remove"></span></button>
                </div>
          
              <div className="modal-body">
              
                <form>
                  <label>
                    Enter Vote:
                    <input type="text" value={this.props.selectedCardID} onChange={this.props.handleChangeSelectedCard} />
                  </label>
                </form>
                <div>
                  <img src={'/images/card-images/'+ this.props.cardChoices[0].cardID + '.png'} />
                  <p>{this.props.cardChoices[0].cardID}</p>
                  <img src={'/images/card-images/'+ this.props.cardChoices[1].cardID + '.png'} />
                  <p>{this.props.cardChoices[1].cardID}</p>
                  <img src={'/images/card-images/'+ this.props.cardChoices[2].cardID + '.png'} />
                  <p>{this.props.cardChoices[2].cardID}</p>
                  <img src={'/images/card-images/'+ this.props.cardChoices[3].cardID + '.png'} />
                  <p>{this.props.cardChoices[3].cardID}</p>
                </div>
                <button data-dismiss="modal" onClick={this.props.submitVote}>Submit</button>
     
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

export default SubmitVote;