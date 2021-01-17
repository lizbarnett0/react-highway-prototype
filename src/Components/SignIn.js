import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../libs/contextLib';
import './signIn.css';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../OtherItems/LoaderButton';
import Logo from '../Images/dark_logo_transparent_background.png';

const SignIn = () => {
	const { setIsAuthenticated, setNavbarStyle,setNavbarVariant } = useAppContext();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	setNavbarStyle('white')
	setNavbarVariant('light')

	const signIn = (event) => {
		event.preventDefault();
		setIsLoading(true);
		Auth.signIn(email, password)
			.then((user) => {
				setError('');
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					history.push('/newuser');
				} else {
					setIsAuthenticated(true);
					history.push('/home');
				}
			})
			.catch((e) => {
				setError(e.message);
				setIsLoading(false);
			});
	};

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
						<div className='error-message'> {error}</div>
						<div className='first-time'>First time visiting Highway? Click <a href='/newuser'> here</a>.</div>
						<LoaderButton
							block
							size='lg'
							type='submit'
							style={{ backgroundColor: '#004225' }}
							isLoading={isLoading}
							onClick={signIn}>
							Sign In
						</LoaderButton>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
