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

    // console.log('Swiping...', e, deltaX, deltaY, absX, absY, velocity)
  	}

  	swiped(e, deltaX, deltaY, isFlick, velocity) {
    // console.log('Swiped...', e, deltaX, deltaY, isFlick, velocity)
  	}

  	componentDidMount(){
  		Velocity(this.refs.p2,{ rotateZ: '+=360deg' },1000)
         .then(e=>console.log('animation complete'))
        
        console.log("block", this.refs.block.scrollWidth,);
        console.log("p1", this.refs.p1.offsetLeft);
        console.log("p2", this.refs.p2.offsetLeft);
        console.log("p3", this.refs.p3.offsetLeft);

        
    }

    componentDidUpdate() {
    	console.log("Component Updated");
    }

    swipedRight() {
    	console.log("Swiped Right");
    	Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration: 1000, offset: 360})
    	
    }

    swipedLeft() {
    	console.log("Swiped Left");
    	Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration:1000, offset: -360})
    
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
					<div ref='p1' className="col-xs-4 PortraitView" id='p1' style={PortraitViewWrapper}>
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