import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UnauthenticatedRoute from './OtherItems/UnauthenticatedRoute';
import AuthenticatedRoute from './OtherItems/AuthenticatedRoute';
import LandingPage from './Components/LandingPage';
import UserHome from './Components/UserHome';
import SignIn from './Components/SignIn';
import FirstSignIn from './Components/FirstSignIn';
import Account from './Components/Account';
import NotFound from './Components/NotFound';

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<LandingPage />
			</Route>
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

			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
};

export default Routes;
