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
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="pull-left">Back to Lobby</div>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> <span className="glyphicon glyphicon-remove"></span></button>
                </div>
          
              <div className="modal-body">
              
                <button data-dismiss="modal" onClick={this.props.backToLobby}>Back to lobby</button>
     
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

export default ReadyUp;