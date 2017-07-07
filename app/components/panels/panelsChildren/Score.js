import React, { Component } from 'react';

const PlayerButtonsStylng = {
  border: '1px soh4d red',
  width: '100%',
  height: '100%',

}

const PlayerButtonWrapper = {
	height: '100%',

}

const ScoreModalPosition = {
  top: '25%'
}

const ModalXButton = {
  position: 'relative',
  top: '5%'
}

class Score extends Component {
	
	render() {
		return (
			<div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' data-toggle="modal" data-target="#scoreBoardModal" style={PlayerButtonsStylng}>
        	S
        </div>

          <div className="modal fade" id="scoreBoardModal">
            <div className="modal-dialog" style={ScoreModalPosition}>
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title pull-left">Scoreboard</h3>
                    <button type="button" className="close" data-dismiss="modal" title="Close" style={ModalXButton}> 
                      <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
          
              <div className="modal-body text-center">
              
                
                	<h4>Player 1: Score-Here</h4>
                	<h4>Player 2: Score-Here</h4>
                	<h4>Player 3: Score-Here</h4>
                	<h4>Player 4: Score-Here</h4>
               	
     
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

export default Score;