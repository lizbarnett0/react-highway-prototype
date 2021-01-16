import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UnauthenticatedRoute from './OtherItems/UnauthenticatedRoute';
import AuthenticatedRoute from './OtherItems/AuthenticatedRoute';
import LandingPage from './Components/LandingPage';
import UserHome from './Components/UserHome';
import SignIn from './Components/Auth/SignIn';
import FirstSignIn from './Components/Auth/FirstSignIn';
import Account from './Components/AccountDetails/Account';
import NotFound from './Components/NotFound';

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
