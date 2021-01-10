import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import './account.css';

import UserInfo from './UserInfo';

const Account = () => {
	const [userInfo, setUserInfo] = useState('');

	useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		const user = await Auth.currentAuthenticatedUser();
		const token = user.signInUserSession.idToken.jwtToken;
		const url =
			'https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/users/';

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Cog-Token': token,
			},
		});
		const data = await response.json();
		console.log(data[0]);
		setUserInfo(data[0]);
		console.log(userInfo);
	};

	
	return (
		<div>
			<h2> Account Details</h2>
			<UserInfo userInfo={userInfo} />

			{!userInfo ? (
				<Button className='post-button'>Fill Out User Information</Button>
			) : (
				<Link to='/updateuserinfo' className='update-button'>
					Update User Info
				</Link>
			)}
		</div>
	);
};

export default Account;
