import React from 'react';
import './notFound.css';

const NotFound = () => {
	return (
		<div className='not-found-page'>
			<div className='not-found-404'>
				<h1>404</h1>
			</div>
			<h2>PAGE NOT FOUND</h2>
			<p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
		</div>
	);
};

export default NotFound;
