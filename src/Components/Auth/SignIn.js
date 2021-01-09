import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './auth.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Logo from '../../Images/logo_transparent_background.png';

const SignIn = () => {
	const [redirect, setRedirect] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = (event) => {
		event.preventDefault();
		Auth.signIn(email, password)
			.then((user) => {
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					setRedirect('firstsignin');
				} else {
					setRedirect('home');
				}
			})
			.catch((e) => {
				console.log(e);
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
							<Form.Label>Email</Form.Label>
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
