import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Redirect, Link } from 'react-router-dom';
import './auth.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FirstSignIn = () => {
	const [email, setEmail] = useState('');
	const [tempPassword, setTempPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('')
	const [redirect, setRedirect] = useState(false);

	const firstSignIn = (event) => {
		event.preventDefault();
		Auth.signIn(email, tempPassword)
			.then((user) => {
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					Auth.completeNewPassword(
						user, // the Cognito User Object
						newPassword // the new password from form
					)
					setRedirect(true)
						.then((user) => {
							// at this time the user is logged in if no MFA required
							console.log(user);
							
						})
						.catch((e) => {
							console.log(e);
						});
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	if (redirect) {
		return <Redirect to='/account' />;
	}

	return (
		<div className='first-signin-page'>
			<Form>
				<Form.Group size='lg' controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='user@example.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group size='lg' controlId='temp-password'>
					<Form.Label>Temporary Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Temporary Password'
						value={tempPassword}
						onChange={(e) => setTempPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group size='lg' controlId='new-password'>
					<Form.Label>New Password</Form.Label>
					<Form.Control
						type='password'
						name='new-password'
						placeholder='New Password'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group size='lg' controlId='confirm-new-password'>
					<Form.Label>Confirm New Password</Form.Label>
					<Form.Control
						type='password'
						name='confirm-new-password'
						placeholder='Confirm New Password'
						value={confirmNewPassword}
						onChange={(e) => setConfirmNewPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Check
						required
						label='Agree to terms and conditions'
						feedback='You must agree before submitting.'
					/>
				</Form.Group>
				<Button type='submit' onClick={firstSignIn}>
					Login
				</Button>
			</Form>
		</div>
	);
};

export default FirstSignIn;
