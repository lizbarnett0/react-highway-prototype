import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { AppContext } from '../libs/contextLib';
import { Auth } from 'aws-amplify';
import FirstSignIn from '../Components/UserWebsite/Auth/FirstSignIn';
import SignIn from '../Components/UserWebsite/Auth/SignIn';
import Account from '../Components/UserWebsite/Account/Account';
import PostUserInfo from '../Components/UserWebsite/Account/PostUserInfo';
import Home from '../Components/GeneralWebsite/LandingPage';
import UserHome from '../Components/UserWebsite/UserHome';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	


	return (
		<div className='App'>
			<AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
				<Route exact path='/' render={() => <Home />} />
				<Route exact path='/newuser' render={() => <FirstSignIn />} />
				<Route exact path='/signin' render={() => <SignIn />} />
				<Route exact path='/home' render={() => <UserHome />} />
				<Route exact path='/account' render={() => <Account />} />
				<Route exact path='/postuserinfo' render={() => <PostUserInfo />} />
			</AppContext.Provider>
		</div>
	);
}

export default App;
