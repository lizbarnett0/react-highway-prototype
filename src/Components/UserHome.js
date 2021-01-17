import React from 'react';
import { useAppContext } from '../libs/contextLib';
import './userHome.css';

const UserHome = () => {
	const { setNavbarStyle, setNavbarVariant } = useAppContext();
	setNavbarStyle('#004225');
	setNavbarVariant('dark');
	return (
		<div className='user-home-page'>
			<h2>USER HOME PAGE</h2>
			<p>Add summary of information and user content here</p>
		</div>
	);
};

export default UserHome;
