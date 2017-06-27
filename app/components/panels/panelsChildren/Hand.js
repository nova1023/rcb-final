import React, { Component } from 'react';
// import Modal from './ModalJS/Modal';

const PlayerButtonsStyling = {
  border: '1px solid red',
  width: '100%',
  height: '100%',

}

const PlayerButtonWrapper = {
  height: '100%',

}

const CardImagesStyling = {
  margin: '0 auto'
}

const SingleCardStyling = {
  maxWidth: '100%',

}

const HideThisList = {
  display: 'none'
}

class Hand extends Component {
	constructor(props) {
    super(props);
    this.state = { isModalOpen: false }
  }

  render() {
    return (

      <div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' data-toggle="modal" data-target="#myModal" style={PlayerButtonsStyling}><a href="#myGallery" data-slide-to="0">H</a></div>
      
          <ul className="list-inline" style={HideThisList}>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="1">
                
              </a>
            </li>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="2">
              </a>
            </li>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="3">
              </a>
            </li>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="4">
              </a>
            </li>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="5">
              </a>
            </li>
          </ul>

          <div className="modal fade" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="pull-left">My Gallery Title</div>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> <span className="glyphicon glyphicon-remove"></span></button>
                </div>
          
              <div className="modal-body">
                <div id="myGallery" className="carousel slide" data-interval="false">
                  <div className="carousel-inner">
                    <div className="item active"> 
                      <img src="/images/card-images/1.png" alt="item1" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                        </div>
                    </div>
                    <div className="item"> 
                      <img src="/images/card-images/2.png" alt="item2" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                        </div>
                    </div>
                    <div className="item"> 
                      <img src="/images/card-images/3.png" alt="item3" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                        </div>
                    </div>
                    <div className="item"> 
                      <img src="/images/card-images/4.png" alt="item4" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                        </div>
                    </div>
                    <div className="item"> 
                      <img src="/images/card-images/5.png" alt="item5" style={CardImagesStyling}/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                        </div>
                    </div>
                  </div>

                  <a className="left carousel-control" href="#myGallery" role="button" data-slide="prev"> 
                  <span className="glyphicon glyphicon-chevron-left"></span></a> 
                  <a className="right carousel-control" href="#myGallery" role="button" data-slide="next"> 
                  <span className="glyphicon glyphicon-chevron-right"></span></a>
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
      </div>

    )
  }
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }
}

export default Hand;



    




//     render() {
//     return (
//       <div  className='row' style={PlayerButtonWrapper}>
//         <div className='col-xs-12' style={PlayerButtonsStyling} onClick={() => this.openModal()}>H</div>
//         <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          
//           <div className='row'>
//             <div className='col-xs-12' style={CardImagesStyling}>

//                 <img src='/images/card-images/1.png' alt='players-card1' />
//                 <img src='/images/card-images/2.png' alt='players-card2' />
//                 <img src='/images/card-images/3.png' alt='players-card3' />

//             </div>
//           </div>

//           <p><button onClick={() => this.closeModal()}>Close</button></p>
//         </Modal>
//       </div>
//     )
//   }

//   openModal() {
//     this.setState({ isModalOpen: true })
//   }

//   closeModal() {
//     this.setState({ isModalOpen: false })
//   }
// }