import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import PostUserInfo from './PostUserInfo';
import UpdateUserInfo from './UpdateUserInfo';
import UserInfo from './UserInfo';

const Account = () => {
	const [userInfo, setUserInfo] = useState('');
	const [showPostModal, setShowPostModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const handlePostClose = () => setShowPostModal(false);
	const handlePostShow = () => setShowPostModal(true);
	const handleUpdateClose = () => setShowUpdateModal(false);
	const handleUpdateShow = () => setShowUpdateModal(true);

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
	};

	return (
		<div>
			<h2> Account Details</h2>
			<UserInfo userInfo={userInfo} />
			<Modal
				show={showPostModal}
				onHide={handlePostClose}
				backdrop='static'
				keyboard={false}
				className='post-modal-form'>
				<PostUserInfo handlePostClose={handlePostClose} />
			</Modal>
			<Modal
				show={showUpdateModal}
				onHide={handleUpdateClose}
				backdrop='static'
				keyboard={false}
				className='update-modal-form'>
				<UpdateUserInfo
					handleUpdateClose={handleUpdateClose}
					userInfo={userInfo}
					getUserInfo={getUserInfo}
					
				/>
			</Modal>

			{!userInfo ? (
				<Button className='post-button' onClick={handlePostShow}>
					Fill Out User Information
				</Button>
			) : (
				<Button className='update-button' onClick={handleUpdateShow}>
					Update User Info
				</Button>
			)}
		</div>
	);
};

export default Account;
