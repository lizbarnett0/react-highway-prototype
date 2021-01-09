import React from 'react';
import { Route } from 'react-router-dom';
import FirstSignIn from '../Components/Auth/FirstSignIn';
import SignIn from '../Components/Auth/SignIn'
import Navigation from '../Components/Navigation/Navigation';
import Account from '../Components/Account/Account'
import Home from '../Components/Home/Home'

function App() {
	return (
		<div className='App'>
			<Navigation />
			<Route exact path='/firstsignin' render={() => <FirstSignIn />} />
			<Route exact path='/signin' render={() => <SignIn />} />
			<Route exact path='/account' render={() => <Account />} 
			/>
			<Route exact path='/home' render={() => <Home />} />
		</div>
	);
}

export default App;
