import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import './firstSignIn.css';
import Form from 'react-bootstrap/Form';
import LoaderButton from '../OtherItems/LoaderButton';
import Logo from '../Images/dark_logo_transparent_background.png';

const FirstSignIn = () => {
	const [email, setEmail] = useState('');
	const [tempPassword, setTempPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const history = useHistory();

	const firstSignIn = (event) => {
		event.preventDefault();
		setIsLoading(true);
		Auth.signIn(email, tempPassword)
			.then((user) => {
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					Auth.completeNewPassword(
						user, // the Cognito User Object
						newPassword // the new password from form
					)
					history.push('/home')
					.catch((e) => {
						setError(e.message);
					});
				}
			})
			.catch((e) => {
				setError(e.message);
				setIsLoading(false);
			});
	};

	return (
		<div className='first-signin-page'>
			<div className='signin-container'>
				<img src={Logo} alt='logo' />
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
							label='Agree to Terms and Conditions'
							feedback='You must agree before submitting.'
						/>
					</Form.Group>
					<div className='error-message'>{error}</div>
					<LoaderButton
						block
						size='lg'
						type='submit'
						isLoading={isLoading}
						onClick={firstSignIn}>
						Sign In
					</LoaderButton>
			
				</Form>
			</div>
		</div>
	);
};

export default FirstSignIn;
