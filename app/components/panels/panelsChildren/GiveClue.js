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

const SubmitClueModalStyling = {
  color: 'black',
  textShadow: '0 0 0',
  width: '21em',
  top: '2%',
  margin: '0 auto'
}

const SubmitButtonStyling = {
  fontWeight: 'bold'
}

const UserInput = {
  fontWeight: 'bold',
  color: 'black'
}

const CardImagesStyling = {
  margin: '0 auto'
}

const CardNumberStyling = {
  fontWeight: '700',
  textShadow: '1px 1px 15px black'
}

class GiveClue extends Component {
  constructor(props){
    super(props);
    this.state = {
   
    };
  }
  
  render() {
    return (
      <div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' data-toggle="modal" data-target="#giveClue" style={PlayerButtonsStyling}>
          S
        </div>

          <div className="modal fade" id="giveClue">
            <div className="modal-dialog" style={SubmitClueModalStyling}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="pull-left">Submit clue & card</h4>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> <span className="glyphicon glyphicon-remove"></span></button>
                </div>
          
                <div className="modal-body">
                  <form onSubmit={this.props.submitStoryTellerRes}>
                    <div className="form-group">
                      <label className="pull-left" htmlFor="clue">
                        Clue:
                      </label>
                      <input 
                      type="text" 
                      name="clue" 
                      className="form-control" 
                      placeholder="Your Clue" 
                      style={UserInput}
                      value={this.props.clue} 
                      onChange={this.props.handleChangeClue} 
                      />
                    </div>

                    <div className="form-group">
                      <label className="pull-left" htmlFor="card">
                        Card:
                      </label>
                      <input 
                        type="text" 
                        name="card" 
                        className="form-control" 
                        placeholder="Card #" 
                        style={UserInput}
                        value={this.props.selectedCardID} 
                        onChange={this.props.handleChangeSelectedCard}  
                      />
                    </div>

                    <div id="submitOwnCardGallery" className="carousel slide" data-interval="false">
                    <div className="carousel-inner">
                      <div className="item active"> 
                        <img className='text-center' src={"/images/card-images/"+this.props.gameState.myHand[0]+".png"} alt="item1" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.props.gameState.myHand[0]}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.props.gameState.myHand[1]+".png"} alt="item2" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.props.gameState.myHand[1]}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.props.gameState.myHand[2]+".png"} alt="item3" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.props.gameState.myHand[2]}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.props.gameState.myHand[3]+".png"} alt="item4" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.props.gameState.myHand[3]}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.props.gameState.myHand[4]+".png"} alt="item5" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.props.gameState.myHand[4]}</h2>
                        </div>
                      </div>
                      <div className="item"> 
                        <img className='text-center' src={"/images/card-images/"+this.props.gameState.myHand[5]+".png"} alt="item5" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h2 style={CardNumberStyling}>{this.props.gameState.myHand[5]}</h2>
                        </div>
                      </div>
                    </div>

                    <a className="left carousel-control" href="#submitOwnCardGallery" role="button" data-slide="prev"> 
                    <span className="glyphicon glyphicon-chevron-left"></span></a> 
                    <a className="right carousel-control" href="#submitOwnCardGallery" role="button" data-slide="next"> 
                    <span className="glyphicon glyphicon-chevron-right"></span></a>
                  </div>

                    <div className="row">
                      <div className="pull-right">
                        <button data-dismiss="modal" className="btn btn-default" onClick={this.props.submitStoryTellerRes} style={SubmitButtonStyling}>Submit</button>
                      </div>
                    </div>
                  </form>

                  

                </div>

              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default GiveClue;