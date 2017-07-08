import React, { Component } from 'react';

const PlayerButtonsStyling = {
  border: '1px solid red',
  width: '320px',
  height: '305px',
  marginLeft: '320px',
}

const PlayerButtonWrapper = {
  height: '100px',
  width: '100px',
}

const CardImagesStyling = {
  margin: '0 auto'
}

const CardNumberStyling = {
  fontWeight: '700',
  textShadow: '1px 1px 15px black'
}

const SubmitCardModalStyling = {
  color: 'black',
  textShadow: '0 0 0',
  width: '21em',
  top: '10%',
  margin: '0 auto'
}

const UserInput = {
  fontWeight: 'bold',
  color: 'black'
}

const SubmitButtonStyling = {
  fontWeight: 'bold'
}

const InputGroupStyling = {
  margin: '-10px 0 4px 0'
}

class SubmitCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameState: {},
      card1: '',
      card2: '',
      card3: '',
      card4: '',
      card5: '',
      card6: '',
      myHand: [],
      clue:'',
      selectedCardID:'',

    }
  }
  
  componentDidUpdate(){
    // console.log("Hand Component Updated");
    if(this.state.gameState !== this.props.gameState){
      // console.log("Hand Updated state with gameState");
      this.setState({gameState: this.props.gameState})
    } else {
      // console.log("Hand did not update state with gameState");
      //do nothing
      if (this.state.gameState !== undefined){
        // console.log("Hand this.gameState !== undefined");
        if (this.state.myHand !== this.state.gameState.myHand){
          this.setState({
            card1: this.state.gameState.myHand[0] + '.png',
            card2: this.state.gameState.myHand[1] + '.png',
            card3: this.state.gameState.myHand[2] + '.png',
            card4: this.state.gameState.myHand[3] + '.png',
            card5: this.state.gameState.myHand[4] + '.png',
            card6: this.state.gameState.myHand[5] + '.png',
            myHand: this.state.gameState.myHand
          })
        } else {
          // do nothing
        }
      } else {
        // do nothing
        // console.log("Hand this,gameState does = undefined");
      }
    }
    console.log("Hand", this.state);
  }

  
  render() {
    return (
      <div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' data-toggle="modal" data-target="#submitOwnCardModal" style={PlayerButtonsStyling}>
          C
        </div>

          <div className="modal fade" id="submitOwnCardModal">
            <div className="modal-dialog" style={SubmitCardModalStyling}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="pull-left">Submit a card</h4>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> 
                    <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
          
                <div className="modal-body">
                  <div className="input-group" style={InputGroupStyling}>
                    <input 
                      type="text"
                      name="card"  
                      className="form-control" 
                      placeholder="Submit Card #" 
                      style={UserInput}
                      value={this.props.selectedCardID} 
                      onChange={this.props.handleChangeSelectedCard}  
                    />
                    <span className="input-group-btn">
                      <button 
                        data-dismiss="modal" 
                        className="btn btn-default" 
                        onClick={this.props.submitCard} 
                        style={SubmitButtonStyling}
                        >Submit
                      </button>
                    </span>
                  </div>

                  <div id="submitOwnCardGallery" className="carousel slide" data-interval="false">
                    <div className="carousel-inner">
                      <div className="item active"> 
                        <img className='text-center' src={"/images/card-images/"+this.state.card1} alt="item1" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.state.card1.substr(0, this.state.card1.lastIndexOf('.'))}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.state.card2} alt="item2" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.state.card2.substr(0, this.state.card2.lastIndexOf('.'))}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.state.card3} alt="item3" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.state.card3.substr(0, this.state.card3.lastIndexOf('.'))}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.state.card4} alt="item4" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.state.card4.substr(0, this.state.card4.lastIndexOf('.'))}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.state.card5} alt="item5" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.state.card5.substr(0, this.state.card5.lastIndexOf('.'))}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.state.card6} alt="item5" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.state.card6.substr(0, this.state.card6.lastIndexOf('.'))}</h2>
                        </div>
                      </div>
                    </div>

                    <a className="left carousel-control" href="#submitOwnCardGallery" role="button" data-slide="prev"> 
                    <span className="glyphicon glyphicon-chevron-left"></span></a> 
                    <a className="right carousel-control" href="#submitOwnCardGallery" role="button" data-slide="next"> 
                    <span className="glyphicon glyphicon-chevron-right"></span></a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default SubmitCard;