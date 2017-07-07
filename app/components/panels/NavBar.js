import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';

const NavBarStyling = {
	backgroundColor: '#6f510c',

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

const SignInModalStyling = {
	color: 'black'
}

class NavBar extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	name: '',
    	password: '',
    	fireRedirect: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePasswordChange(event) {
  	this.setState({password: event.target.value});
  }

  handleSignInSubmit(event) {
    event.preventDefault();
    console.log(this.props.socket);
  	let socket = this.props.socket;
  	let self = this;
  	console.log('A name was submitted: ' + this.state.name);
    console.log('Password was submitted: ' + this.state.password);

    var userInfo = {};
    userInfo.username = this.state.name;
    userInfo.password = this.state.password;
    console.log(userInfo);

    $.ajax(
    {
    	url: "/api/login",
    	method: "POST",
    	data: userInfo
    }).done(function(response) 
    {
    	if (response.success) {
	    	socket.emit("playerJoined", self.state.name);
	    	self.setState({fireRedirect: true});
	    	console.log(self.state.name);
	    	$(".modal-backdrop").remove();
	    }
	    else {
	    	alert("Player did not join");
	    }
    });
  }


	render() {
		if (this.state.fireRedirect === true) {
			return <Redirect to='/lobby' />
		}
		else {
			return (
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
					        	<NavLink to="#" data-toggle="modal" data-target="#signInModal">Sign In</NavLink>
					        </li>

					        <div className="modal fade" id="signInModal">
			              <div className="modal-dialog" style={SignInModalStyling}>
			                <div className="modal-content">
			                  <div className="modal-header">
			                    <h3 className="modal-title pull-left">Sign In</h3>
			                    <button type="button" className="close" data-dismiss="modal" title="Close"> 
			                    	<span className="glyphicon glyphicon-remove"></span>
			                    </button>
			                  </div>

			                  <div className="modal-body">
			        						<form action="/api/login" method="POST" onSubmit={this.handleSignInSubmit}>
			        							<div className="form-group">
				        							<label className="pull-left" htmlFor="userName">
				        								Name:
				        							</label>
				      								<input type="text" name="username" className="form-control" placeholder="Username" value={this.state.name} onChange={this.handleNameChange} />
			      								</div>

			      								<div className="form-group">
				        							<label className="pull-left" htmlFor="signInPassword">
				        								Password:
				        							</label>
				        							<input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}  />
			        							</div>

			        							<button type="submit" value="Submit" className="btn btn-default">Submit</button>
			        							
			        						</form>
			                  </div>

			                </div>
			              </div>
		            	</div>

					        {/*<li>
					          <a href="#">User Profile</a>
					        </li>*/}
					      </ul>
					    </div>
					  </div> 
					</div>
				  
				</nav>
			)
		}
	}
}

export default NavBar;