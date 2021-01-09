import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const UserInfo = () => {
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
		console.log(data)
		setUserInfo(data[0]);
	};

	return (
		<div className='userInfo-container'>
			<h1>User Info</h1>
			<h2>{userInfo.id}</h2>
			<h2>
				{userInfo.firstName} {userInfo.lastName}
			</h2>
			<h2>{userInfo.addressOne} </h2>
			<h2>{userInfo.addressTwo}</h2>
			<h2>{userInfo.city}</h2>
			<h2>{userInfo.state}</h2>
			<h2>{userInfo.zip}</h2>
		</div>
	);
};

export default UserInfo;
