import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import UserInfo from './UserInfo';

const Account = () => {
	const [userInfo, setUserInfo] = useState('');

	// useEffect(() => {
	// 	getUserInfo();
	// }),[];

	// const getUserInfo = async () => {
	// 	const user = await Auth.currentAuthenticatedUser();
	// 	const token = user.signInUserSession.idToken.jwtToken;
	// 	const url =
	// 		'https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/users/';

	// 	const response = await axios.get(url, {
	// 		headers: {
	// 			'Cog-Token': token,
	// 		},
	// 	});
	// 
	// 	console.log(response);
	// 	setUserInfo(data[0]);
	// };

	return (
		<div>
			<h2> Account Details</h2>
			<UserInfo userInfo={userInfo} />

			{!userInfo ? (
				<Button className='post-button'>Fill Out User Information</Button>
			) : (
				<Button className='update-button'>Update User Info</Button>
			)}
		</div>
	);
};

export default Account;
