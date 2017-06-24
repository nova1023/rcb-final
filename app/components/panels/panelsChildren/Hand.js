import React, { Component } from 'react';
import Modal from './ModalJS/Modal';

class Hand extends Component {
	constructor(props) {
    super(props);
    this.state = { isModalOpen: false }
  }

  render() {
    return (
      <div>
        <button className='btn btn-primary' onClick={() => this.openModal()}>Hand</button>
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