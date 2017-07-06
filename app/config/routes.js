import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

//import components
import Landing from '../components/Landing';
import Lobby from '../components/Lobby';
import GameRoom from '../components/GameRoom';
import App from '../app.js';

import IO from 'socket.io-client';  
const socket = IO() ;

module.exports = (
	<Router>
		<Switch>
			<Route exact path="/" render={(props) => (<Landing socket={socket} />)} />
			<Route path="/lobby" render={(props) => (<Lobby socket={socket} />)} />
			<Route path="/gameroom" render={(props) => (<GameRoom socket={socket} />)} />
			<Route path="/testingPage" render={(props) => (<App socket={socket} />)} />
		</Switch>
	</Router>
);