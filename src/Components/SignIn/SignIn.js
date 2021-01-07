import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import './signIn.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function signIn(event) {
		event.preventDefault();

		try {
			await Auth.signIn(email, password);
			alert('Logged in');
		} catch (e) {
			console.log(e.message);
		}
	}

	return (
		<div className='login-page'>
			<div className='login-container'>
				{/* <img src={Logo} alt='logo' /> */}
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
							Login
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
