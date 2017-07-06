import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';


class SignIn extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	name: '',
    	password: '',
    	fireRedirect: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePasswordChange(event) {
  	this.setState({password: event.target.value});
  }

  handleSubmit(event) {
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
	    }
	    else {
	    	alert("Player did not join");
	    }
    });

   
  }

	render() {
		if (this.state.fireRedirect === true) {
			return <Redirect to="/lobby" />
		}
		else {
			return (
				<div className="row">
					<div className="col-xs-12 sign-in-form" id="sign-in-form">
						<h3>Sign In</h3>
						<form action="/api/login" method="POST" onSubmit={this.handleSubmit}>
							<label htmlFor="userName">
								Name:
								<input type="text" name="username" value={this.state.name} onChange={this.handleNameChange} />
							</label>
							<label htmlFor="signInPassword">
								Password:
								<input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}  />
							</label>
							
							<input type="submit" value="Submit" />

						</form>
					</div>
				</div>
			)
		}
	}
}

export default SignIn;
