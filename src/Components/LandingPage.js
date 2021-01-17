import React from 'react';
import './landingPage.css';
import { useAppContext } from '../libs/contextLib';

const LandingPage = () => {
	const { setNavbarStyle, setNavbarVariant } = useAppContext();
	setNavbarStyle('#004225');
	setNavbarVariant('dark');
	return (
		<div className='landing-page'>
			<h2>LANDING PAGE</h2>
			<p>Add general Highway Benefits content here</p>
		</div>
	);
};

export default LandingPage;
