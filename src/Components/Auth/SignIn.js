import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../../libs/contextLib';
import './auth.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Logo from '../../Images/dark_logo_transparent_background.png';

const SignIn = () => {
	const { setIsAuthenticated } = useAppContext();
	const [redirect, setRedirect] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const signIn = (event) => {
		event.preventDefault();
		Auth.signIn(email, password)
			.then((user) => {
				setError('');
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					setRedirect('firstsignin');
				} else {
					setRedirect('home');
					setIsAuthenticated(true);
				}
			})
			.catch((e) => {
				setError(e.message);
			});
	};

	if (redirect === 'firstsignin') {
		return <Redirect to='/firstsignin' />;
	}
	if (redirect === 'home') {
		return <Redirect to='/home' />;
	}
	return (
		<div className='signin-page'>
			<div className='signin-container'>
				<img src={Logo} alt='logo' />
				<div className='form-container'>
					<Form>
						<Form.Group size='lg' controlId='email'>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type='email'
								name='email'
								placeholder='user@example.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group size='lg' controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								name='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
						<div className='error-message'>{error}</div>
						<Button type='submit' onClick={signIn}>
							Sign In
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
