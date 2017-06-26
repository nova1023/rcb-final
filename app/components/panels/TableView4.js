import React, { Component } from 'react';
import PortraitView from './panelsChildren/PortraitView';
import Swipeable from 'react-swipeable';
import Velocity from 'velocity-animate';

const TableViewSwipeWrapper = {
	height: '90%',
	width: '165%',
	
};

const TableViewWrapper = {
	height: '100%',
	width: '100%',
	backgroundImage: 'url(/images/avatars/bar-bg.jpg)',
	backgroundSize: 'cover',

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
  		Velocity(this.refs.block,{ rotateZ: '+=360deg' },1000)
         .then(e=>console.log('animation complete'))
         // Velocity(this.refs.block,'scroll',{ axis:'x', duration: 1500, easing: "spring", offset:150 })
         // .then(e=>console.log('animation complete'))
    }

    swipedRight() {
    	Velocity(this.refs.block, "scroll", { axis:'x', duration: 1000, offset: '250px' })
         .then(e=>console.log('animation complete'))
    	 // Velocity(this.refs.block,'scroll',{ axis:'x', duration: 1500, easing: "spring", offset: 150 })
      //    .then(e=>console.log('Swiped Right... animation complete'))
    }

	render() {
		return (
			<Swipeable 
				onSwiping={this.swiping}
        		onSwiped={this.swiped} 
        		onSwipedRight={this.swipedRight} 
        		className='row' 
        		style={TableViewSwipeWrapper}
        	>	
        		<div ref='block' style={TableViewWrapper}>
					<div className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
						<PortraitView />
					</div>
					<div className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
						<PortraitView />
					</div>
					<div className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
						<PortraitView />
					</div>
				</div>
			</Swipeable>
		)
	}
}

export default TableView4;