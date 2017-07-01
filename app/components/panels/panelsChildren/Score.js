import React, { Component } from 'react';

const PlayerButtonsStyh4ng = {
  border: '1px soh4d red',
  width: '100%',
  height: '100%',

}

const PlayerButtonWrapper = {
	height: '100%',

}



class Score extends Component {
	
	render() {
		return (
			<div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' data-toggle="modal" data-target="#scoreBoard" style={PlayerButtonsStyh4ng}>
        	S
        </div>

          <div className="modal fade" id="scoreBoard">
            <div className="modal-dialog">
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