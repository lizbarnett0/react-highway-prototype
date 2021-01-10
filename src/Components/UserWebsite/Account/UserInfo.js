import React from 'react';


const UserInfo = ({ userInfo }) => {
	return (
		<div>
			{userInfo ? (
				<div className='userInfo-container'>
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
			) : (
				<p>hi</p>
			)}
		</div>
	);
};

export default UserInfo;
