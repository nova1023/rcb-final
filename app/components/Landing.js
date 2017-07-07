import React, { Component } from 'react';
// import GameInfo from './panels/GameInfo';
// import PlayNowAlias from './panels/PlayNowAlias';
import { Route, Link, Redirect, NavLink } from 'react-router-dom';

const LandingPageContainer = {
	height: '100vh',
	width: '320px',
	backgroundImage: 'url(/images/avatars/landing-bg1.png)',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	color: 'white',
	border: '1px solid'
}

const NavBarStyling = {
	backgroundColor: 'black',

}

const LandingEmblem = {
	margin: '0 auto',
	width: '50%'
}

const BrandImg = {
	position: 'relative',
	top: '-13px',
	left: '4px',
	width: '45px'
}

const NavBarToggleButton = {
	position: 'relative',
	right: '4px'
}

const GameDescriptionStyling = {
	paddingLeft: '2%'
}

const InputStyling = {
	color: 'black'
}


class Landing extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	value: '',
		fireRedirect: false,

	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
  	event.preventDefault();
  	console.log(this.props.socket);
  	let socket = this.props.socket;
  	
    console.log('A name was submitted: ' + this.state.value);
    socket.emit("playerJoined", this.state.value);
    this.setState({fireRedirect: true});
  }


	render() {

		if (this.state.fireRedirect === true) {
			return <Redirect to='/lobby' />

		} else {
			
		

		return (
			<div className="container-fluid" style={LandingPageContainer}>

		
				<nav className="navbar navbar-default" id="main-nav-bar" style={NavBarStyling}>
				  
				  	<div className="row">
							<div className="col-xs-12">

						    <div className="navbar-header">
						      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" style={NavBarToggleButton}>
						        <span className="sr-only">Toggle navigation</span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						      </button>
						       <NavLink className="navbar-brand" to="/">
						       	<img src={"/images/avatars/emblem.png"} alt="Oops!" style={BrandImg}></img>
						       </NavLink>
						    </div>

						    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						      <ul className="nav navbar-nav navbar-right">
						        <li className="">
						          <NavLink to="/">Home<span className="sr-only">(current)</span></NavLink>
						        </li>
						        <li>
						        	<NavLink to="/signin">Sign In</NavLink>
						        </li>
						        {/*<li>
						          <a href="#">User Profile</a>
						        </li>*/}
						      </ul>
						    </div>
						  </div> 
						</div>
				  
				</nav>

				<div className="col-xs-12">
					<div className="row">
						<div className="col-xs-12" >
							<img src={"/images/avatars/emblem.png"} alt="Wrong" className="img-responsive" style={LandingEmblem} />
						</div>

						<div className="row">
							<div className="col-xs-12">
								<h4 id="game-description" style={GameDescriptionStyling}>Det er et velkjent faktum at lesere distraheres av lesbart innhold på en side når man ser på dens layout. 
								Poenget med å bruke Lorem Ipsum er at det har en mer eller mindre normal fordeling av bokstaver i ord, 
								i motsetning til 'Innhold her, innhold her', og gir inntrykk av å være lesbar tekst. 
								Mange webside- og sideombrekkingsprogrammer
								</h4>
							</div>
						</div>	
					</div>
				</div>
				
				<div className="col-xs-12">
					<div className="row">
						<div className="col-xs-10 col-xs-offset-1 text-center">
							<form onSubmit={this.handleSubmit}>
								<h3>Play as a Guest or sign up below!</h3>
				        <label>
				          Nickname:
				          <input type="text" value={this.state.value} onChange={this.handleChange} style={InputStyling}/>
				        </label>
				       <input type="submit" value="Submit" style={InputStyling}/>
				      </form>

				      <Link to="/signup"><h1>SIGN UP NOW</h1></Link>

						</div>
					</div>
				</div>
			</div>

		  
		)
	}}
}
export default Landing;



// <footer class="footer">
// 		    <div class="container">
// 		      <div class="row">
// 		        <div class="col-xs-12">
// 		          <div class="col-xs-10 col-xs-offset-1 text-center footer-padding-copyright footer-text">
// 		            <p>Copyright 2017 | NEW TITLE HERE</p>
// 		            <div class="col-xs-6 footer-padding">
// 		              <h4>Team Members:</h4>
// 		              <p>Doug Aquilino</p>
// 		              <p>Daniel Cross</p>
// 		              <p>Christian Liguori</p>
// 		              <p>Thomas Yu</p>
// 		            </div>
// 		            <div class="col-xs-6 footer-padding">
// 		              <h4>Check Us Out</h4>
// 		              <p><a href="https://github.com/dlcNine/rcb-final" target="_blank">Github</a></p>
// 		            </div>
// 		          </div>
// 		        </div>
// 		      </div>
// 		    </div>
// 		  </footer>
