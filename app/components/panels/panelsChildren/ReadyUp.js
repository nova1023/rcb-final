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

const ReadyNextTurnModalStyling = {
  color: 'black',
  textShadow: '0 0 0',
  width: '21em',
  top: '25%',
  margin: '0 auto'
}

const ButtonStyling = {
  fontWeight: 'bold'
}

const BigButtonStyling = {
  left: '11%',
  position: 'relative',
  fontWeight: 'bold'
}

class ReadyUp extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  
  render() {
    return (
      <div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' data-toggle="modal" data-target="#readyUpModal" style={PlayerButtonsStyling}>
          R
        </div>

          <div className="modal fade" id="readyUpModal">
            <div className="modal-dialog" style={ReadyNextTurnModalStyling}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="pull-left">Click for next round</h4>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> 
                    <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
          
              <div className="modal-body">
              
                <button 
                  data-dismiss="modal" 
                  className="btn btn-default btn-lg" 
                  onClick={this.props.sendReadyForNextTurn} 
                  style={BigButtonStyling}
                >
                  Ready For Next Turn
                </button>
     
              </div>

                <div className="modal-footer">
                  <button className="btn btn-default" type="button" data-dismiss="modal" style={ButtonStyling}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default ReadyUp;