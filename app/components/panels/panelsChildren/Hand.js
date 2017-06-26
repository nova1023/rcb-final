import React, { Component } from 'react';
import Modal from './ModalJS/Modal';

const PlayerButtonsStyling = {
  border: '1px solid red',
  width: '100%',
  height: '100%',

}

const PlayerButtonWrapper = {
  height: '100%',

}

class Hand extends Component {
	constructor(props) {
    super(props);
    this.state = { isModalOpen: false }
  }

  render() {
    return (
      <div  className='row' style={PlayerButtonWrapper}>
        <div className='col-xs-12' style={PlayerButtonsStyling} onClick={() => this.openModal()}>H</div>
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <h1>Modal title</h1>
          <p>hello</p>
          <p><button onClick={() => this.closeModal()}>Close</button></p>
        </Modal>
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