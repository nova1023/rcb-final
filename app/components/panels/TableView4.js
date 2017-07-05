import React, { Component } from 'react';
import PortraitView from './panelsChildren/PortraitView';
import Swipeable from 'react-swipeable';
import Velocity from 'velocity-animate';
import GiveClue from './panelsChildren/GiveClue';
import SubmitCard from './panelsChildren/SubmitCard';
import SubmitVote from './panelsChildren/SubmitVote';
import ReadyUp from './panelsChildren/ReadyUp';

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

const TableStyling = {
	height: '100%',
	position: 'absolute',
	top: '100%',
	backgroundImage: 'url(/images/avatars/classy-fabric.png), url(/images/avatars/table-2.png)'

};

class TableView4 extends Component {

	constructor(props){
		super(props);
		this.state={

		}

		this.swipedRight = this.swipedRight.bind(this);
		this.swipedLeft = this.swipedLeft.bind(this);
		this.swipedDown = this.swipedDown.bind(this);
		this.swipedUp = this.swipedUp.bind(this);
		this.swiping = this.swiping.bind(this);
		this.swiped = this.swiped.bind(this);
		this.showPrompts = this.showPrompts.bind(this);
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
    	console.log("TableView Component Updated");
    	if(this.state.gameState !== this.props.gameState){
			this.setState({gameState: this.props.gameState})
		} else {
			//do nothing
		}
		console.log("TableView", this.state);	
    }

    swipedRight() {
    	console.log("Swiped Right");
    	Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration: 1000, offset: 360})
    	
    }

    swipedLeft() {
    	console.log("Swiped Left");
    	Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration:1000, offset: -360})
    
    }

    swipedDown() {
    	console.log("Swiped Down");
    	Velocity(this.refs.p1, "scroll", { container:this.refs.block, duration:1000, offset: 345 })
        Velocity(this.refs.p1, "scroll", { axis:'x', container:this.refs.block, duration:1000, offset: 360, queue:false })
    }

    swipedUp() {
    	console.log("Swiped Up");
    	Velocity(this.refs.p1, "scroll", { container:this.refs.block, duration:1000, offset: -345 })
    }

    showPrompts(){
    	console.log("showPrompts called");
    	
    	// If the gameState is set up
    	if (this.state.gameState !== undefined){
    		console.log("TableView gameState is defined");
    		
    		// If the storyTeller's Number matches my player number
    		//----------------------------------------------------------------------------------------------
    		if (this.state.gameState.whoIsStoryTeller === this.state.gameState.myPlayerNumber){
    			console.log("I am the storyteller");

    			// If the turn phase is on 'storyTellerSubmits' show the storyTeller's prompt
    			if (this.state.gameState.turnPhase === 'storyTellerSubmits'){
    				console.log("storyTellerSubmits phase");
    				let prompt = 
    				<GiveClue 
    					handleChangeClue={this.props.handleChangeClue}
                		handleChangeSelectedCard={this.props.handleChangeSelectedCard}
                		submitStoryTellerRes={this.props.submitStoryTellerRes} 
                	/>;
	    		console.log("Sending Prompt", prompt);
	    		return prompt;

	    		// If the turn phase is on 'readyForNextTurn'
	    		} else if(this.state.gameState.turnPhase === 'readyForNextTurn') {
    				let prompt = 
    				<ReadyUp
    					sendReadyForNextTurn={this.props.sendReadyForNextTurn}
    				/>
    				console.log("Sent Prompt", prompt);
    				return prompt;
	    		
	    		// else it is not time for the storyTeller to give a response
	    		} else {
	    			console.log("NOT storyTellerSubmits phase");
	    			//do nothing
	    			return;
	    		}
    			
    		// If the storyTeller's Number does not match my number
    		//----------------------------------------------------------------------------------------------
    		} else {
    			console.log("I am not the storyTeller");

    			// If the turn phase is on 'playersSubmitCards'
    			if (this.state.gameState.turnPhase === 'playersSubmitCards'){
    				let prompt = 
    				<SubmitCard 
                		handleChangeSelectedCard={this.props.handleChangeSelectedCard}
                		submitCard={this.props.submitCard}
                	/>;
    				console.log("sent prompt", prompt);
    				return prompt;
    			
    			// If the turn phase is on 'playersSubmitVotes'
    			} else if(this.state.gameState.turnPhase === 'playersSubmitVotes'){
    				let prompt = 
    				<SubmitVote
    					handleChangeSelectedCard={this.props.handleChangeSelectedCard}
    					submitVote={this.props.submitVote}
    					cardChoices={this.state.gameState.submittedCards}
    				/>;
    				console.log("Checking submittedCards", this.state.gameState.submittedCards);
    				console.log("Sent Prompt", prompt);
    				return prompt;
    			
    			// If the turn phase is on 'readyForNextTurn'
    			} else if(this.state.gameState.turnPhase === 'readyForNextTurn') {
    				let prompt = 
    				<ReadyUp
    					sendReadyForNextTurn={this.props.sendReadyForNextTurn}
    				/>
    				console.log("Sent Prompt", prompt);
    				return prompt;

    			// If the turn phase is NOT any of the above
    			} else {
    				console.log("NOT on a player phase");
    				// do nothing
    				return;
    			}
    		
    		}
    	
    	// If the gameState is undefined
    	} else {
    		console.log("TableView return nothing");
    		// do nothing
    		return;
    	}
    }

	render() {

		let prompt = this.showPrompts();

		return (
			<div ref='block' style={TableViewSwipeWrapper}>
				<Swipeable 
				trackMouse={true}
				onSwiping={this.swiping}
        		onSwiped={this.swiped} 
        		onSwipedRight={this.swipedRight} 
        		onSwipedLeft={this.swipedLeft}
        		onSwipedDown={this.swipedDown}
        		onSwipedUp={this.swipedUp}
        		className='row SwipeContainer' 
        		style={TableViewWrapper}
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
					<div className='col-xs-12 Table' style={TableStyling}>
						{prompt}
					</div>
				</Swipeable>
			</div>		
		)
	}
}

export default TableView4;