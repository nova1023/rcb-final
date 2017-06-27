import React, { Component } from 'react';
import PortraitView from './panelsChildren/PortraitView';
import Swipeable from 'react-swipeable';
import Velocity from 'velocity-animate';

const TableViewSwipeWrapper = {
	height: '90%',
	width: '100%',
	overflow: 'hidden',
	position: 'relative',
	
};

const TableViewWrapper = {
	height: '100%',
	width: '300%',
	backgroundImage: 'url(/images/avatars/bar-bg.jpg)',
	backgroundSize: 'cover',
	position: 'relative',

};

const PortraitViewWrapper = {
	height: '100%',

};

class TableView4 extends Component {

	constructor(props){
		super(props);
		this.state={

		}

		this.swipedRight = this.swipedRight.bind(this);
		this.swipedLeft = this.swipedLeft.bind(this);
		this.swiping = this.swiping.bind(this);
		this.swiped = this.swiped.bind(this);
	}

	swiping(e, deltaX, deltaY, absX, absY, velocity) {

    console.log('Swiping...', e, deltaX, deltaY, absX, absY, velocity)
  	}

  	swiped(e, deltaX, deltaY, isFlick, velocity) {
    console.log('Swiped...', e, deltaX, deltaY, isFlick, velocity)
  	}

  	componentDidMount(){
  		Velocity(this.refs.p2,{ rotateZ: '+=360deg' },1000)
         .then(e=>console.log('animation complete'))
        
    }

    swipedRight() {
    	// Velocity(this.refs.p3,{ rotateZ: '+=360deg' },1000)
         // .then(e=>console.log('animation complete'))
    	Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration: 1000, offset: 360})
         .then(e=>console.log('swipedRight... animation complete', this.refs.block))
    	
    }

    swipedLeft() {
    	// Velocity(this.refs.p1,{ rotateZ: '+=360deg' },1000)
         // .then(e=>console.log('animation complete'))
    	Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration: 1000, offset: -360})
         .then(e=>console.log('swipedLeft... animation complete'))
    	
    }

	render() {
		return (
			<div ref='block' style={TableViewSwipeWrapper}>
				<Swipeable 
				trackMouse={true}
				onSwiping={this.swiping}
        		onSwiped={this.swiped} 
        		onSwipedRight={this.swipedRight} 
        		onSwipedLeft={this.swipedLeft}
        		className='row' 
        		style={TableViewWrapper}
        		ref='swipe'
        		>	
					<div ref='p1' className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
						<PortraitView />
					</div>
					<div ref='p2' className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
						<PortraitView />
					</div>
					<div ref='p3' className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
						<PortraitView />
					</div>
				</Swipeable>
			</div>		
		)
	}
}

export default TableView4;