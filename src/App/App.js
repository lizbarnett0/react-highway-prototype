import React from 'react';
import { Route } from 'react-router-dom';
import FirstSignIn from '../Components/Auth/FirstSignIn';
import SignIn from '../Components/Auth/SignIn';
import Account from '../Components/Account/Account';
import PostUserInfo from '../Components/Account/PostUserInfo';


function App() {
	return (
		<div className='App'>
			<Route exact path='/newuser' render={() => <FirstSignIn />} />
			<Route exact path='/signin' render={() => <SignIn />} />
			<Route exact path='/account' render={() => <Account />} />
			<Route exact path='/postuserinfo' render={() => <PostUserInfo />} />
			{/* <Route exact path='/updateuserinfo' render={() => <UpdateUserInfo />} /> */}
		</div>
	);
}

export default App;
