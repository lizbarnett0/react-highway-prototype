import React, { useState } from 'react';
import { useAppContext } from '../libs/contextLib';
import { Auth } from 'aws-amplify';
import { Button, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './firstSignIn.css';
import LoaderButton from '../OtherItems/LoaderButton';
import Logo from '../Images/dark_logo_transparent_background.png';

const FirstSignIn = () => {
	const { setNavbarStyle, setNavbarVariant } = useAppContext();
	const [email, setEmail] = useState('');
	const [tempPassword, setTempPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [error, setError] = useState('');
	const [termsShow, setTermsShow] = useState(false);
	const history = useHistory();

	const handleTermsOpen = () => setTermsShow(true);
	const handleTermsClose = () => setTermsShow(false);

	setNavbarStyle('white');
	setNavbarVariant('light');
	const firstSignIn = (event) => {
		event.preventDefault();
		setIsLoading(true);
		Auth.signIn(email, tempPassword)
			.then((user) => {
				if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
					Auth.completeNewPassword(
						user, // the Cognito User Object
						newPassword // the new password from form
					);
					history.push('/home').catch((e) => {
						setError(e.message);
					});
				}
			})
			.catch((e) => {
				setError(e.message);
				setIsLoading(false);
			});
	};

	function handleChange() {
		setDisabled(!disabled);
	}
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
							style={{ display: 'inline' }}
							feedback='You must agree before submitting.'
							onChange={handleChange}
						/>
						<span>
							{' '}
							I agree to the{' '}
							<button className='terms-button' onClick={handleTermsOpen}>
								Terms & Conditions
							</button>
						</span>
					</Form.Group>
					<div className='error-message'>{error}</div>
					<LoaderButton
						block
						size='lg'
						type='submit'
						disabled={disabled}
						isLoading={isLoading}
						onClick={firstSignIn}>
						Sign In
					</LoaderButton>
				</Form>
				<Modal show={termsShow} onHide={handleTermsClose}>
					<Modal.Header closeButton>
						<Modal.Title>Terms and Conditions</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
						cursus vitae massa id egestas. Vivamus mollis, erat sed iaculis
						pulvinar, magna augue sagittis mauris, ac rutrum erat neque non
						lectus. Ut diam ligula, iaculis id sapien non, tempus commodo nibh.
						Sed semper, ligula a pharetra vulputate, mi nunc efficitur sapien,
						ac volutpat neque tellus a magna. Praesent ut mauris aliquet,
						facilisis ipsum sit amet, scelerisque erat. Vestibulum justo velit,
						ornare vel lacus eget, aliquam tincidunt enim. Praesent id orci vel
						leo dapibus convallis. Pellentesque sit amet elit in ex iaculis
						eleifend. Nam in risus sed tellus egestas facilisis. Praesent
						egestas turpis lectus, non interdum justo dignissim in. Vestibulum
						fringilla ipsum sed eros ultricies mattis. In lacus dolor,
						scelerisque vitae purus eget, interdum ullamcorper ipsum. Vivamus
						vitae risus risus. In gravida erat turpis, vitae scelerisque justo
						pellentesque at. Sed cursus ornare est, et semper lectus. Proin non
						enim semper, tincidunt metus lacinia, rhoncus felis. Donec orci
						magna, pharetra ac finibus sed, rhoncus eget velit. Vestibulum quam
						urna, porta pulvinar ipsum et, ultrices sagittis lectus. Nunc mollis
						neque odio, vestibulum mattis diam feugiat vel. Ut lobortis euismod
						sem ac efficitur. Vivamus eu nibh enim. Proin sit amet massa
						tristique, condimentum mi ac, condimentum nisi.
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={handleTermsClose}
							style={{ backgroundColor: '#004225' }}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
};

export default FirstSignIn;
