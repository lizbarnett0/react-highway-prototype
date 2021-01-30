import React from 'react';
import './landingPage.css';
import { useAppContext } from '../libs/contextLib';

const LandingPage = () => {
	const { setNavbarStyle, setNavbarVariant } = useAppContext();
	setNavbarStyle('#004225');
	setNavbarVariant('dark');
	return (
		<div className='landing-page'>
			<div className='tagline'>
				Changing the relationship between employers and their employees through
				new and improved benefits.
			</div>
			<div className='description'>
				Highway's first product, a student loan matching platform, allows
				employers to design a custom plan which helps to contribute to their
				employees' student loans, in turn helping employees pay off their loans
				faster, saving money and reducing stress.
			</div>
			<div className='contact'>
				Interested in learning more?  <a href='mailto:cory@highwaybenefits.com'>Contact us!</a>
			</div>
		</div>
	);
};

export default LandingPage;
