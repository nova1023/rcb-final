import React, { Component } from 'react';
// import GameInfo from './panels/GameInfo';
// import PlayNowAlias from './panels/PlayNowAlias';
import { Route, Link, Redirect } from 'react-router-dom';




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
			<div className="container-fluid">

		
				<nav className="navbar navbar-default" id="main-nav-bar">
				  
				  	<div className="row">
							<div className="col-xs-12">

						    <div className="navbar-header">
						      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						        <span className="sr-only">Toggle navigation</span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						      </button>
						       <a className="navbar-brand" href="">
						       	<img src="#" alt="Oops!" id=""></img>
						       </a>
						    </div>

						    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						      <ul className="nav navbar-nav navbar-right">
						        <li className="">
						          <a href="#">Home<span className="sr-only">(current)</span></a>
						        </li>
						        <li>
						        	<a href="#">Sign In</a>
						        </li>
						        <li>
						          <a href="#">User Profile</a>
						        </li>
						      </ul>
						    </div>
						  </div> 
						</div>
				  
				</nav>

				<div className="col-xs-12">
					<div className="row">
						<div className="col-xs-4">
							<img src={"http://images.uesp.net//1/1e/SR-book-Nightingale.png"} alt="Wrong" className="img-responsive" />
						</div>

						<div className="col-xs-8">
							<div>
								<h4 id="game-description">Det er et velkjent faktum at lesere distraheres av lesbart innhold på en side når man ser på dens layout. 
								Poenget med å bruke Lorem Ipsum er at det har en mer eller mindre normal fordeling av bokstaver i ord, 
								i motsetning til 'Innhold her, innhold her', og gir inntrykk av å være lesbar tekst. 
								Mange webside- og sideombrekkingsprogrammer bruker nå Lorem Ipsum som sin standard for provisorisk tekst, 
								og et søk etter 'Lorem Ipsum' vil avdekke mang en uferdig webside. Ulike versjoner har sprunget frem i senere år, 
								noen ved rene uhell og andre mer planlagte (med humor o.l.).
								</h4>
							</div>
						</div>	
					</div>
				</div>
				
				<div className="col-xs-12">
					<div className="row">
						<div className="col-xs-10 col-xs-offset-1 text-center">
							<form onSubmit={this.handleSubmit}>
								<h3>No sign up required!</h3>
				        <label>
				          Nickname:
				          <input type="text" value={this.state.value} onChange={this.handleChange} />
				        </label>
				       <input type="submit" value="Submit" />
				      </form>

				      <h1><Link to="/lobby">Lobby Link</Link></h1>
				      <h1><Link to="/gameroom">GameRoom Link</Link></h1>
				      <h1><Link to="/testingPage">Testing Page</Link></h1>



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
