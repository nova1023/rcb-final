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

const CardImagesStyling = {
  margin: '0 auto'
}

const CardNumberStyling = {
  fontWeight: '700',
  textShadow: '1px 1px 15px black'
}

class SubmitVote extends Component {
  constructor(props){
    super(props);
    this.state = {
      clue:'',
      selectedCardID:'',

    }
  }
  
  render() {
    return (
      <div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' data-toggle="modal" data-target="#submitVote" style={PlayerButtonsStyling}>
          V
        </div>

          <div className="modal fade" id="submitVote">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="pull-left">Submit Vote</div>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> <span className="glyphicon glyphicon-remove"></span></button>
                </div>
          
              <div className="modal-body">
                <form>
                  <label>
                    Enter Vote:
                    <input type="text" value={this.props.selectedCardID} onChange={this.props.handleChangeSelectedCard} />
                  </label>
                </form>

                <div id="votingCardGallery" className="carousel slide" data-interval="false">
                  <div className="carousel-inner">
                    <div className="item active">
                      <img className="text-center" src={'/images/card-images/'+ this.props.cardChoices[0].cardID + '.png'} style={CardImagesStyling} />
                      <div className="carousel-caption">
                        <h2 style={CardNumberStyling}>{this.props.cardChoices[0].cardID}</h2>
                      </div>
                    </div>
                    <div className="item">
                      <img className="text-center" src={'/images/card-images/'+ this.props.cardChoices[1].cardID + '.png'} style={CardImagesStyling} />
                      <div className="carousel-caption">
                        <h2 style={CardNumberStyling}>{this.props.cardChoices[1].cardID}</h2>
                      </div>
                    </div>
                    <div className="item">
                      <img className="text-center" src={'/images/card-images/'+ this.props.cardChoices[2].cardID + '.png'} style={CardImagesStyling} />
                      <div className="carousel-caption">
                        <h2 style={CardNumberStyling}>{this.props.cardChoices[2].cardID}</h2>
                      </div>
                    </div>
                    <div className="item">
                      <img className="text-center" src={'/images/card-images/'+ this.props.cardChoices[3].cardID + '.png'} style={CardImagesStyling} />
                      <div className="carousel-caption">
                        <h2 style={CardNumberStyling}>{this.props.cardChoices[3].cardID}</h2>
                      </div>
                    </div>
                  </div>

                  <a className="left carousel-control" href="#votingCardGallery" role="button" data-slide="prev"> 
                  <span className="glyphicon glyphicon-chevron-left"></span></a> 
                  <a className="right carousel-control" href="#votingCardGallery" role="button" data-slide="next"> 
                  <span className="glyphicon glyphicon-chevron-right"></span></a>
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