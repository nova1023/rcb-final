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

class GiveClue extends Component {
  
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
              
               <h1>GiveClue</h1>
     
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

export default GiveClue;