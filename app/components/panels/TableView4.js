import React, { Component } from 'react';
import PortraitView from './panelsChildren/PortraitView';
import Swipeable from 'react-swipeable';
import Velocity from 'velocity-animate';
import GiveClue from './panelsChildren/GiveClue';
import SubmitCard from './panelsChildren/SubmitCard';
import SubmitVote from './panelsChildren/SubmitVote';
import ReadyUp from './panelsChildren/ReadyUp';
import BackToLobby from './panelsChildren/BackToLobby';
import TurnPhaseMessage from './panelsChildren/TurnPhaseMessage';

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
            cursorLocationVert: 'top',
            cursorLocationHori: 'p1',
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
  		// Velocity(this.refs.p2,{ rotateZ: '+=360deg' },1000)
    //      .then(e=>console.log('animation complete'))
        
    //     console.log("block", this.refs.block.scrollWidth,);
    //     console.log("p1", this.refs.p1.offsetLeft);
    //     console.log("p2", this.refs.p2.offsetLeft);
    //     console.log("p3", this.refs.p3.offsetLeft);        
    }

    componentDidUpdate() {
    	console.log("TableView Component Updated");	
    }

    swipedRight() {
    	console.log("Swiped Right");
        
        // if cursor is on the top
        if (this.state.cursorLocationVert === 'top'){
    	   
            //if cursor is on p1
            if (this.state.cursorLocationHori === 'p3'){
                Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration: 500, offset: '-320px'})
                this.setState({cursorLocationHori:'p2'})
            // if cursor is on p2 
            } else if (this.state.cursorLocationHori === 'p2'){
                Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration: 500, offset: '-320px'})
                this.setState({cursorLocationHori:'p1'})
            // if cursor is on p1 or an error occurs 
            } else {
                // Do nothing, do not want to scroll past the window.
            }
    	
        // if the cursor is on the bottom
        } else {
            // Cant scroll left of right while cursor is on the bottom, only up
        }
    }

    swipedLeft() {
    	console.log("Swiped Left");
       
        // if cursor is on the top
        if (this.state.cursorLocationVert === 'top'){
        
            //if cursor is on p3
            if (this.state.cursorLocationHori === 'p1'){
                Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration: 500, offset: '320px'})
                this.setState({cursorLocationHori:'p2'})
            // if cursor is on p2 
            } else if (this.state.cursorLocationHori === 'p2'){
                Velocity(this.refs.p1, "scroll", { container: this.refs.block, axis:'x', duration: 500, offset: '320px'})
                this.setState({cursorLocationHori:'p3'})
            // if cursor is on p3 or an error occurs 
            } else {
                // Do nothing, do not want to scroll past the window.
            }
        
        // if the cursor is on the bottom
        } else {
            // Cant scroll left of right while cursor is on the bottom, only up
        }
    }

    swipedUp() {
    	console.log("Swiped Up");
    	// Velocity(this.refs.p1, "scroll", { container:this.refs.block, duration:1000, offset: 345 })
     //    Velocity(this.refs.p1, "scroll", { axis:'x', container:this.refs.block, duration:1000, offset: 360, queue:false })
        // if cursor is on the top
        if (this.state.cursorLocationVert === 'top'){
            
            //if cursor is on p1
            if (this.state.cursorLocationHori === 'p1'){
                Velocity(this.refs.p1, "scroll", { container:this.refs.block, duration:500, offset: 345 })
                Velocity(this.refs.p1, "scroll", { axis:'x', container:this.refs.block, duration:500, offset: 320, queue:false })
                this.setState({cursorLocationHori:'p2', cursorLocationVert:'bottom'})
            // if cursor is on p2 
            } else if (this.state.cursorLocationHori === 'p2'){
                Velocity(this.refs.p1, "scroll", { container:this.refs.block, duration:500, offset: 345 })
                Velocity(this.refs.p1, "scroll", { axis:'x', container:this.refs.block, duration:500, offset: 0, queue:false })
                this.setState({cursorLocationHori:'p2', cursorLocationVert:'bottom'})
            // if cursor is on p3 or an error occurs 
            } else {
                Velocity(this.refs.p1, "scroll", { container:this.refs.block, duration:500, offset: 345 })
                Velocity(this.refs.p1, "scroll", { axis:'x', container:this.refs.block, duration:500, offset: -320, queue:false })
                this.setState({cursorLocationHori:'p2', cursorLocationVert:'bottom'})
            }
        
        // if the cursor is on the bottom
        } else {
            // Cant scroll down while cursor is on the bottom, only up
        }
    }

    swipedDown() {
    	console.log("Swiped Down");
    	
        
        // if cursor is on the bottom
        if (this.state.cursorLocationVert === 'bottom'){
            Velocity(this.refs.p1, "scroll", { container:this.refs.block, duration:500, offset: -345 })
            this.setState({cursorLocationVert:'top'})
        
        // if the cursor is on the top
        } else {
            // Cant scroll up while cursor is on the top, only down
        }
    }

    showPrompts(){
    	console.log("showPrompts called");
    	
    	// If the turn phase is not exitGame
    	if (this.props.gameState.turnPhase !== 'exitGame'){
    		console.log("exitGame has not been called");
    		
    		// If the storyTeller's Number matches my player number
    		//----------------------------------------------------------------------------------------------
    		if (this.props.gameState.whoIsStoryTeller === this.props.gameState.myPlayerNumber){
    			console.log("I am the storyteller");

    			// If the turn phase is on 'storyTellerSubmits' show the storyTeller's prompt
    			if (this.props.gameState.turnPhase === 'storyTellerSubmits'){
    				console.log("storyTellerSubmits phase");
    				let prompt = 
    				<div>
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'You are the story teller this turn. Please submit a card and a clue.'}
                    />
                    <GiveClue 
                        gameState={this.props.gameState}
    					handleChangeClue={this.props.handleChangeClue}
                		handleChangeSelectedCard={this.props.handleChangeSelectedCard}
                		submitStoryTellerRes={this.props.submitStoryTellerRes}
                	/>;
                    </div>
	    		console.log("Sending Prompt", prompt);
	    		return prompt;

                // If the turn phase is on 'playersSubmitCards'
                } else if (this.props.gameState.turnPhase === 'playersSubmitCards'){
                    let prompt = 
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'Waiting for the other players to submit their cards.'}
                    />
                    console.log("sent prompt", prompt);
                    return prompt;

                // If the turn phase is on 'playersSubmitVotes'
                } else if(this.props.gameState.turnPhase === 'playersSubmitVotes'){
                    let prompt = 
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'Waiting for the other players to submit their votes.'}
                    />
                    console.log("Checking submittedCards", this.props.gameState.submittedCards);
                    console.log("Sent Prompt", prompt);
                    return prompt;

	    		// If the turn phase is on 'readyForNextTurn'
	    		} else if(this.props.gameState.turnPhase === 'readyForNextTurn') {
    				let prompt = 
                    <div>
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'This turn is over, please ready up for next turn.'}
                    />
    				<ReadyUp
    					sendReadyForNextTurn={this.props.sendReadyForNextTurn}
    				/>
                    </div>
    				console.log("Sent Prompt", prompt);
    				return prompt;

                } else if(this.props.gameState.turnPhase === 'gameOver') {
                    let prompt = 
                    <div>
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'Someone won! When you\'re ready, please return to the lobby.'}
                    />
                    <BackToLobby
                        backToLobby={this.props.backToLobby}
                    />
                    </div>
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

                // If the turn phase is on 'storyTellerSubmits' show the player's prompt
                if (this.props.gameState.turnPhase === 'storyTellerSubmits'){
                    console.log("storyTellerSubmits phase");
                    let prompt = 
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'Waiting for the story teller to submit their card and clue.'}
                    />
                console.log("Sending Prompt", prompt);
                return prompt;
    			

                // If the turn phase is on 'playersSubmitCards'
    			} else if (this.props.gameState.turnPhase === 'playersSubmitCards'){
    				let prompt =
                    <div>
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'Please submit a card that you think matches the clue to fool the other players.'}
                    /> 
    				<SubmitCard
                        gameState={this.props.gameState} 
                		handleChangeSelectedCard={this.props.handleChangeSelectedCard}
                		submitCard={this.props.submitCard}
                	/>;
                    </div>
    				console.log("sent prompt", prompt);
    				return prompt;
    			
    			// If the turn phase is on 'playersSubmitVotes'
    			} else if(this.props.gameState.turnPhase === 'playersSubmitVotes'){
    				let prompt = 
                    <div>
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'Please vote for the card you think is the story teller\'s card.'}
                    />
    				<SubmitVote
    					handleChangeSelectedCard={this.props.handleChangeSelectedCard}
    					submitVote={this.props.submitVote}
    					cardChoices={this.props.gameState.submittedCards}
    				/>;
                    </div>
    				console.log("Checking submittedCards", this.props.gameState.submittedCards);
    				console.log("Sent Prompt", prompt);
    				return prompt;
    			
    			// If the turn phase is on 'readyForNextTurn'
    			} else if(this.props.gameState.turnPhase === 'readyForNextTurn') {
    				let prompt = 
                    <div>
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'This turn is over, please ready up for next turn.'}
                    />
    				<ReadyUp
    					sendReadyForNextTurn={this.props.sendReadyForNextTurn}
    				/>
                    </div>
    				console.log("Sent Prompt", prompt);
    				return prompt;

                } else if(this.props.gameState.turnPhase === 'gameOver') {
                    let prompt = 
                    <div>
                    <TurnPhaseMessage
                        swipedRight={this.swipedRight}
                        swipedLeft={this.swipedLeft}
                        swipedDown={this.swipedDown}
                        swipedUp={this.swipedUp}
                        gameState={this.props.gameState}
                        message={'Someone won! When you\'re ready, please return to the lobby.'}
                    />
                    <BackToLobby
                        backToLobby={this.props.backToLobby}
                    />
                    </div>
                    console.log("Sent Prompt", prompt);
                    return prompt;

    			// If the turn phase is NOT any of the above
    			} else {
    				console.log("NOT on a player phase");
    				// do nothing
    				return;
    			}
    		
    		}
    	
    	// If the turn phase is exitGame
    	} else {
    		console.log("exitGame has been called");
            let prompt = 
            <div>
    		<TurnPhaseMessage
                swipedRight={this.swipedRight}
                swipedLeft={this.swipedLeft}
                swipedDown={this.swipedDown}
                swipedUp={this.swipedUp}
                gameState={this.props.gameState}
                message={'Someone has left the game, when you are ready, click to go back tothe lobby.'}
            />
            <BackToLobby
                backToLobby={this.props.backToLobby}
            />
            </div>
    		return prompt;
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
						<PortraitView
                            avatar={'Beruka'}
                         />
					</div>
					<div ref='p2' className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
						<PortraitView
                            avatar={'Dwyer'}
                         />
					</div>
					<div ref='p3' className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
						<PortraitView
                            avatar={'Kana'}
                         />
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