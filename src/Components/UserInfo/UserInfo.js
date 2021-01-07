import React from 'react';
import { Auth } from 'aws-amplify';

const UserInfo = () => {
	const callAPI = async () => {
		const user = await Auth.currentAuthenticatedUser();
		console.log(user);
		const token = user.signInUserSession.idToken.jwtToken;
		console.log(token);
		const url =
			'https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/users/';

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Cog-Token': token,
			},
		});
		const data = await response.json();
		console.log(data);
	};
	callAPI();

	return (
		<div>
			<h1>User Info</h1>
		</div>
	);
};

export default UserInfo;
