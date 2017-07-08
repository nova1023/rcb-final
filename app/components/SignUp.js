import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

class SignUp extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	name: '',
    	password: '',
    	confirmPassword: '',
      fireRedirect: false
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

  handleSignUpSubmit(event) {
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.name);
    console.log('Password was submitted: ' + this.state.password);
    
    let socket = this.props.socket;
    let self = this;

    if (this.state.password === this.state.confirmPassword){
    	console.log('Both passwords match: ' + this.state.password + ' & ' + this.state.confirmPassword);

      //build data to send to back end
      var userInfo = {};
      userInfo.username = this.state.name;
      userInfo.password = this.state.password;
      userInfo.passwordConfirm = this.state.confirmPassword;
      console.log("data object built");
      console.log(userInfo);

      //Make post request to register new user
      $.ajax(
      {
        url: "/api/register",
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
          alert("Player did not sign up");
        }
      });
    }
    else {
    	console.log('Please make sure both password inputs are identical');
    }
    
  }

	render() {
    if (this.state.fireRedirect === true) {
      return <Redirect to="/lobby" />
    }
    else {
  		return (
  			<div className="row">
  				<div className="col-xs-12 sign-up-form" id="sign-up-form">
            <div className="modal fade" id="signUpModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="pull-left">Sign Up</div>
                    <button type="button" className="close" data-dismiss="modal" title="Close"> <span className="glyphicon glyphicon-remove"></span></button>
                  </div>

                  <div className="modal-body">
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
              </div>
            </div>
  				</div>
  			</div>

		  )
    }
  }
}

export default SignUp;




// <p>Already have an account?<a className="sign-in-button" href="/sign-in"> Sign In! </a></p>

// import React, { Component } from 'react';
// import { Route, Link, Redirect } from 'react-router-dom';


// class SignUp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       password: '',
//       confirmPassword: '',
//       fireRedirect: false
//     };

//     this.handleNameChange = this.handleNameChange.bind(this);
//     this.handlePasswordChange = this.handlePasswordChange.bind(this);
//     this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleNameChange(event) {
//     this.setState({name: event.target.value});
//   }

//   handlePasswordChange(event) {
//     this.setState({password: event.target.value});
//   }

//   handleConfirmPasswordChange(event) {
//     this.setState({confirmPassword: event.target.value});
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     console.log('A name was submitted: ' + this.state.name);
//     console.log('Password was submitted: ' + this.state.password);
    
//     let socket = this.props.socket;
//     let self = this;

//     if (this.state.password === this.state.confirmPassword){
//       console.log('Both passwords match: ' + this.state.password + ' & ' + this.state.confirmPassword);

//       //build data to send to back end
//       var userInfo = {};
//       userInfo.username = this.state.name;
//       userInfo.password = this.state.password;
//       userInfo.passwordConfirm = this.state.confirmPassword;
//       console.log("data object built");
//       console.log(userInfo);

//       //Make post request to register new user
//       $.ajax(
//       {
//         url: "/api/register",
//         method: "POST",
//         data: userInfo
//       }).done(function(response)
//       {
//         if (response.success) {
//           socket.emit("playerJoined", self.state.name);
//           self.setState({fireRedirect: true});
//           console.log(self.state.name);
//         }
//         else {
//           alert("Player did not sign up");
//         }
//       });
//     }
//     else {
//       console.log('Please make sure both password inputs are identical');
//     }
    
//   }

//   render() {
//     if (this.state.fireRedirect === true) {
//       return <Redirect to="/lobby" />
//     }
//     else {
//       return (
//         <div className="row">
//           <div className="col-xs-12 sign-in-form" id="sign-in-form">
//               <h3>Sign Up</h3>
//               <form action="/api/register" method="POST" onSubmit={this.handleSubmit}>
//                 <label htmlFor="userName">
//                   Name:
//                   <input type="text" name="username" value={this.state.name} onChange={this.handleNameChange} />
//                 </label>
//                 <label htmlFor="signInPassword">
//                   Password:
//                   <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}  />
//                 </label>
//                 <label htmlFor="signInPassword">
//                   Confirm Password:
//                   <input type="password" name="passwordConfirm" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
//                 </label>
                
//                 <input type="submit" value="Submit" />

//               </form>
//           </div>
//         </div>

//       )
//     }
//   }
// }

// export default SignUp;
