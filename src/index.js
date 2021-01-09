import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App/App'
import { Amplify } from 'aws-amplify';
import config from './config';

import 'bootstrap/dist/css/bootstrap.min.css';


Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID,
	},
	API: {
		endpoints: [
			{
				name: 'users',
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION,
			},
		],
	},
});

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
