import React from 'react';
import { Switch } from 'react-router-dom';
import UnauthenticatedRoute from './Components/UnauthenticatedRoute';
import AuthenticatedRoute from './Components/AuthenticatedRoute';
import LandingPage from './Components/LandingPage';
import UserHome from './Components/UserHome';
import SignIn from './Components/Auth/SignIn'
import FirstSignIn from './Components/Auth/FirstSignIn';
import Account from './Components/AccountDetails/Account';
import NotFound from './Components/NotFound'

const Routes = () => {
	return (
		<Switch>
			<UnauthenticatedRoute exact path='/'>
				<LandingPage />
			</UnauthenticatedRoute>
			<UnauthenticatedRoute exact path='/newuser'>
				<FirstSignIn />
			</UnauthenticatedRoute>
			<UnauthenticatedRoute exact path='/signin'>
				<SignIn />
			</UnauthenticatedRoute>
			<AuthenticatedRoute exact path='/home'>
				<UserHome />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path='/account'>
				<Account />
			</AuthenticatedRoute>
			<UnauthenticatedRoute>
				<NotFound />
			</UnauthenticatedRoute>
		</Switch>
	);
};

export default Routes;
