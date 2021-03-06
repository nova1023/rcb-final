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

const ScoreModalStyling = {
  top: '21%',
  color: 'black',
  textShadow: '0 0 0',
  width: '21em',
  margin: '0 auto',
}

const IconStyling = {
  width: '100%',
  height: '100%',
}

class Score extends Component {
	
	render() {
		return (
			<div  className='row' style={PlayerButtonWrapper}>

        <div className='col-xs-12' data-toggle="modal" data-target="#scoreBoardModal" style={PlayerButtonsStyling}>
        	<img src='/images/avatars/complete/icon-score.png' style={IconStyling} />
        </div>

          <div className="modal fade" id="scoreBoardModal">
            <div className="modal-dialog" style={ScoreModalStyling}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title pull-left">Scoreboard</h4>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> 
                      <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
          
              <div className="modal-body text-center">
                	<h4>{this.props.gameState.p1UserName}: {this.props.gameState.p1Points}</h4>
                	<h4>{this.props.gameState.p2UserName}: {this.props.gameState.p2Points}</h4>
                	<h4>{this.props.gameState.p3UserName}: {this.props.gameState.p3Points}</h4>
                	<h4>{this.props.gameState.p4UserName}: {this.props.gameState.p4Points}</h4>
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