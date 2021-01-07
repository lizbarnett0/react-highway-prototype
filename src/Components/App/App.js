import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Amplify from 'aws-amplify';
import FirstSignIn from '../FirstSignIn/FirstSignIn';
import SignIn from '../SignIn/SignIn';
import UserInfo from '../UserInfo/UserInfo';

function App() {
	return (
		<div className='App'>
			<Route exact path='/firstsignin' render={() => <FirstSignIn />} />
			<Route exact path='/signin' render={() => <SignIn />} />
			<Route exact path='/userinfo' render={() => <UserInfo />} />
		</div>
	);
}

export default App;
