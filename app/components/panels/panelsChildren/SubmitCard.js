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

const SubmitCardModalStyling = {
  color: 'black',
  textShadow: '0 0 0',
  width: '21em',
  top: '21%',
  margin: '0 auto'
}

const UserInput = {
  fontWeight: 'bold',
  color: 'black'
}

const SubmitButtonStyling = {
  fontWeight: 'bold'
}

class SubmitCard extends Component {
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
        <div className='col-xs-12' data-toggle="modal" data-target="#submitCardModal" style={PlayerButtonsStyling}>
          C
        </div>

          <div className="modal fade" id="submitCardModal">
            <div className="modal-dialog" style={SubmitCardModalStyling}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="pull-left">Submit a card</h4>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> 
                    <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
          
                <div className="modal-body">
                  <div className="form-group">
                    <label className="pull-left" htmlFor="card">
                      Enter Card:
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

                  <div className="row">
                    <div className="pull-right">
                      <button data-dismiss="modal" className="btn btn-default" onClick={this.props.submitCard} style={SubmitButtonStyling}>Submit</button>
                    </div>
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