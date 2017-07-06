import React, { Component } from 'react';



class SignUp extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	name: '',
    	password: '',
    	confirmPassword: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePasswordChange(event) {
  	this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange(event) {
  	this.setState({confirmPassword: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.name);
    console.log('Password was submitted: ' + this.state.password);
    if (this.state.password === this.state.confirmPassword){
    	console.log('Both passwords match: ' + this.state.password + ' & ' + this.state.confirmPassword);

      //build data to send to back end
      var userInfo = {};
      userInfo.username = this.state.name;
      userInfo.password = this.state.password;
      userInfo.passwordConfirm = this.state.confirmPassword;
      console.log("data object built");

      //Make post request to register new user
      $.ajax(
      {
        url: "/api/register",
        method: "POST",
        data: userInfo
      }).done(function(response)
      {
        console.log("in the response");
      });
    }
    else {
    	console.log('Please make sure both password inputs are identical');
    }
    event.preventDefault();
  }

	render() {
		return (
			<div className="row">

					<div className="col-xs-12 sign-in-form" id="sign-in-form">
							<h3>Sign Up</h3>
							<form action="/api/register" method="POST" onSubmit={this.handleSubmit}>
								<label htmlFor="userName">
									Name:
									<input type="text" name="username" value={this.state.name} onChange={this.handleNameChange} />
								</label>
								<label htmlFor="signInPassword">
									Password:
									<input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}  />
								</label>
								<label htmlFor="signInPassword">
									Confirm Password:
									<input type="password" name="passwordConfirm" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
								</label>
								
								<input type="submit" value="Submit" />

							</form>
					</div>

						

				</div>
		)
	}
}

export default SignUp;




// <p>Already have an account?<a className="sign-in-button" href="/sign-in"> Sign In! </a></p>
