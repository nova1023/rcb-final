import React, { Component } from 'react';

const PlayerButtonsStyling = {
  // border: '1px solid red',
  width: '80%',
  height: '80%',
  margin: '8% 0 0 10%',
  backgroundImage: 'url(/images/avatars/Wood-Button.jpg)',

}

const PlayerButtonWrapper = {
	height: '100%',

}

const ScoreModalPosition = {
  top: '25%'
}

class Score extends Component {
	
	render() {
		return (
			<div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' data-toggle="modal" data-target="#scoreBoard" style={PlayerButtonsStyling}>
        	S
        </div>

          <div className="modal fade" id="scoreBoard">
            <div className="modal-dialog" style={ScoreModalPosition}>
              <div className="modal-content">
                <div className="modal-header">
                  <div className="pull-left">Scoreboard</div>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> <span className="glyphicon glyphicon-remove"></span></button>
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