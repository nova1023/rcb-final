import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//import components
import Landing from '../components/Landing';
import Lobby from '../components/Lobby';
import GameRoom from '../components/GameRoom';
import App from '../app.js';

module.exports = (
	<Router>
		<Switch>
			<Route exact path="/" component={Landing} />
			<Route path="/lobby" component={Lobby} />
			<Route path="/gameroom" component={GameRoom} />
			<Route path="/testingPage" component={App} />
		</Switch>
	</Router>
);