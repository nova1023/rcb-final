import React, { Component } from 'react';

const PlayerButtonsStyling = {
  border: '1px solid red',
  width: '100%',
  height: '100%',

}

const PlayerButtonWrapper = {
	height: '100%',

}

const HideBulletPoints = {
	listStyleType: 'none',

}

class Score extends Component {
	
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
                  <div className="pull-left">Scoreboard</div>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> <span className="glyphicon glyphicon-remove"></span></button>
                </div>
          
              <div className="modal-body">
              
                <ul style={HideBulletPoints}>
                	<li>Player 1: Score-Here</li>
                	<li>Player 2: Score-Here</li>
                	<li>Player 3: Score-Here</li>
                	<li>Player 4: Score-Here</li>
               	</ul>
     
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