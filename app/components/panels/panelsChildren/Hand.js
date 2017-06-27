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
  overflow: 'scroll',
  width: '100%'
}

const SingleCardStyling = {
  maxWidth: '100%',

}

const HideThisElement = {
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
      
          <ul className="list-inline" style={HideThisElement}>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="1">
                <img className="img-thumbnail" src="/images/card-images/1.png"/>
              </a>
            </li>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="2">
                <img className="img-thumbnail" src="/images/card-images/2.png"/>
              </a>
            </li>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="3">
                <img className="img-thumbnail" src="/images/card-images/3.png"/>
              </a>
            </li>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="4">
                <img className="img-thumbnail" src="/images/card-images/4.png"/>
              </a>
            </li>
            <li data-toggle="modal" data-target="#myModal">
              <a href="#myGallery" data-slide-to="5">
                <img className="img-thumbnail" src="/images/card-images/5.png"/>
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
                      <img src="/images/card-images/1.png" alt="item1"/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                          <p>Slide 0  description.</p>
                        </div>
                    </div>
                    <div className="item"> 
                      <img src="/images/card-images/2.png" alt="item2"/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                          <p>Slide 1 description.</p>
                        </div>
                    </div>
                    <div className="item"> 
                      <img src="/images/card-images/3.png" alt="item3"/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                          <p>Slide 2  description.</p>
                        </div>
                    </div>
                    <div className="item"> 
                      <img src="/images/card-images/4.png" alt="item4"/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                          <p>Slide 3 description.</p>
                        </div>
                    </div>
                    <div className="item"> 
                      <img src="/images/card-images/5.png" alt="item5"/>
                        <div className="carousel-caption">
                          <h3>Heading 3</h3>
                          <p>Slide 4 description.</p>
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
                    <small>Photographs by <a href="http://lorempixel.com" target="new">Lorempixel.com</a></small>
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



    




