import React from 'react';
import { Route } from 'react-router-dom';
import FirstSignIn from '../Components/Auth/FirstSignIn/FirstSignIn';
import SignIn from '../Components/Auth/SignIn/SignIn';
import Navigation from '../Components/Navigation/Navigation';
import Account from '../Components/Account/Account'

function App() {
	return (
		<div className='App'>
			<Navigation />
			<Route exact path='/firstsignin' render={() => <FirstSignIn />} />
			<Route exact path='/signin' render={() => <SignIn />} />
			<Route exact path='/account' render={() => <Account />} />
		</div>
	);
}

export default App;
