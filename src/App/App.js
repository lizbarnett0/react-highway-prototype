import React from 'react';
import { Route } from 'react-router-dom';
import FirstSignIn from '../Components/UserWebsite/Auth/FirstSignIn';
import SignIn from '../Components/UserWebsite/Auth/SignIn';
import Account from '../Components/UserWebsite/Account/Account';
import PostUserInfo from '../Components/UserWebsite/Account/PostUserInfo';
import Home from '../Components/GeneralWebsite/LandingPage'


function App() {
	return (
		<div className='App'>
			<Route exact path='/' render={() => <Home />} />
			<Route exact path='/newuser' render={() => <FirstSignIn />} />
			<Route exact path='/signin' render={() => <SignIn />} />
			<Route exact path='/account' render={() => <Account />} />
			<Route exact path='/postuserinfo' render={() => <PostUserInfo />} />
		</div>
	);
}

export default App;
