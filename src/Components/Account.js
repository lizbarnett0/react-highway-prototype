import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../libs/contextLib';
import { Button, Form, Modal, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
// import { usePlaidLink } from 'react-plaid-link';
import LoaderButton from '../OtherItems/LoaderButton';
import axios from 'axios';
import './account.css';

const Account = () => {
	const Plaid = window.Plaid;
	const { setNavbarStyle, setNavbarVariant } = useAppContext();
	const [cogToken, setCogToken] = useState('');
	const [err, setErr] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [userInfo, setUserInfo] = useState('');
	const [updateShow, setUpdateShow] = useState(false);
	const [postShow, setPostShow] = useState(false);
	const [passwordShow, setPasswordShow] = useState(false);
	const [updatedUserObject, setUpdatedUserObject] = useState({
		fname: userInfo.firstName,
		lname: userInfo.lastName,
		add1: userInfo.addressOne,
		add2: userInfo.addressTwo,
		city: userInfo.city,
		state: userInfo.state,
		zip: userInfo.zip,
		ph: userInfo.phone,
	});

	const [postUserObject, setPostUserObject] = useState({
		fname: '',
		lname: '',
		add1: '',
		add2: '',
		city: '',
		state: '',
		zip: '',
		ph: '',
	});

	setNavbarStyle('#004225');
	setNavbarVariant('dark');

	const handlePostClose = () => setPostShow(false);
	const handlePostShow = () => setPostShow(true);

	const handleUpdateClose = () => setUpdateShow(false);
	const handleUpdateShow = () => setUpdateShow(true);

	const handlePasswordClose = () => setPasswordShow(false);
	const handlePasswordShow = () => setPasswordShow(true);

	useEffect(() => {
		getUserInfo();
	}, []);

	const getUserInfo = async () => {
		const user = await Auth.currentAuthenticatedUser();
		const token = user.signInUserSession.idToken.jwtToken;
		setCogToken(token)
		const url =
			'https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/users/';

		const response = await axios.get(url, {
			headers: {
				'Cog-Token': token,
			},
		});
		const data = await response.data[0];
		setUserInfo(data);
	};

	// Post User Information Functions

	const handlePostChange = (event) => {
		event.preventDefault();
		setPostUserObject({
			...postUserObject,
			[event.target.name]: event.target.value,
		});
	};

	const postUserInfo = async () => {
		const user = await Auth.currentAuthenticatedUser();
		const token = user.signInUserSession.idToken.jwtToken;
		const email = user.attributes.email;
		const url = `https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/users/${email}`;

		const response = await axios
			.post(url, postUserObject, { headers: { 'Cog-Token': token } })
			.then((response) => {
				console.log(response);
			})
			.catch(console.err);

		console.log(response);
	};

	// Update User Information Functions
	const handleUpdateChange = (event) => {
		event.preventDefault();
		setUpdatedUserObject({
			[event.target.name]: event.target.value,
		});
		console.log(updatedUserObject);
	};

	const updateUserInfo = async () => {
		const user = await Auth.currentAuthenticatedUser();
		const token = user.signInUserSession.idToken.jwtToken;
		const email = user.attributes.email;
		const url = `https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/users/${email}`;

		const response = await axios
			.patch(url, updatedUserObject, { headers: { 'Cog-Token': token } })
			.then((response) => {
				console.log(response);
			})
			.catch(console.err);
	};

	//Plaid Account Functions
	// let linkToken = '';
	// let publicToken = '';

	// const getLinkToken = async () => {
	// 	const user = await Auth.currentAuthenticatedUser();
	// 	const token = user.signInUserSession.idToken.jwtToken;

	// 	const response = await axios.get(
	// 		'https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/link-token/',
	// 		{
	// 			headers: {
	// 				'Cog-Token': token,
	// 			},
	// 		}
	// 	);
	// 	linkToken = response.results.link_token;
	// };

	// const onSuccess = useCallback((publicToken, metadata) => {
	// 	const user = Auth.currentAuthenticatedUser();
	// 	const token = user.signInUserSession.idToken.jwtToken;
	// 	axios({
	// 		method: 'post',
	// 		url: 'https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/link-token',
	// 		data: {
	// 			public_token: publicToken,
	// 			metadata: metadata
	// 		},
	// 		headers: {
	// 			'Cog-Token': token
	// 		}
	// 	});

	// }, []);

	// const onEvent = useCallback(
	// 	(eventName, metadata) => console.log('onEvent', eventName, metadata),
	// 	[]
	// );

	// const onExit = useCallback(
	// 	(err, metadata) => console.log('onExit', err, metadata),
	// 	[]
	// );

	// const config = {
	// 	token: linkToken,
	// 	onSuccess,
	// 	onEvent,
	// 	onExit,
	// };

	// const { open, ready, error } = usePlaidLink(config);

	function linkAccount() {
		let link_token = '';
		let pub_token = '';

		function getLinkToken() {
			let xhr = new XMLHttpRequest();

			xhr.open(
				'GET',
				'https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/link-token/'
			);

			xhr.responseType = 'json';
			xhr.setRequestHeader('Cog-Token', cogToken);

			xhr.send();

			xhr.onload = function () {
				let responseObj = xhr.response;
				link_token = responseObj.results.link_token;
				openLink();
			};
		}

		function openLink() {
			const handler = Plaid.create({
				token: link_token,
				onSuccess: (public_token, metadata) => {
					console.log('This gets Called!');
					console.log(public_token);
					pub_token = public_token;
					handler.exit();
					handler.destroy();
					exhangePublicToken();
				},
				onLoad: () => {},
				onExit: (err, metadata) => {},
				onEvent: (eventName, metadata) => {},
				receivedRedirectUri: null,
			});
			handler.open();
		}
		function exhangePublicToken() {
			let requestBody = {};
			requestBody['public_token'] = pub_token;
			// requestBody['bank_name'] = document.getElementById(
			// 	'linked-account-name'
			// ).value;
			let bodyJson = JSON.stringify(requestBody);
			let xhr = new XMLHttpRequest();
			xhr.open(
				'POST',
				'https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/link-token'
			);

			xhr.responseType = 'json';
			xhr.setRequestHeader('Cog-Token', cogToken);

			xhr.send(bodyJson);

			xhr.onload = () => {
				const response = JSON.parse(xhr.response);
				console.log(response);
				// document.getElementById('linked-account-name').value = '';
				getUserInfo();
			};
		}
		getLinkToken();
	}

	//Edit Credentials Functions
	const changePassword = async () => {
		setIsLoading(true);
		Auth.currentAuthenticatedUser()
			.then((user) => {
				return Auth.changePassword(user, currentPassword, newPassword);
			})
			.then((data) => {
				console.log(data);
				handlePasswordClose();
			})
			.catch((e) => {
				setErr(e.message);
				setIsLoading(false);
			});
	};

	//NEED TO Fix this - keeps loading if there
	// if (!userInfo) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<div>
			<div className='account-details-title'> Account Details</div>
			<div className='account-message'>
				Your are logged in as {userInfo.id}.
			</div>
			{userInfo ? (
				<div className='user-info-container'>
					<div className='account-section-title'> User Information</div>
					<div className='info-title'> Name</div>
					<div className='user-info'>
						{userInfo.firstName} {userInfo.lastName}
					</div>
					<div className='info-title'> Address</div>
					<div className='user-info'>
						{userInfo.addressOne}, {userInfo.addressTwo} <br />
						{userInfo.city}, {userInfo.state} {userInfo.zip}
					</div>
					<div className='info-title'> Phone</div>
					<div className='user-info'>{userInfo.phone}</div>

					{!userInfo ? (
						<div className='button-div'>
							<Button
								variant='primary'
								onClick={handlePostShow}
								style={{ backgroundColor: '#004225' }}>
								Add Account Details
							</Button>
						</div>
					) : (
						<div className='button-div'>
							<Button
								variant='primary'
								onClick={handleUpdateShow}
								style={{ backgroundColor: '#004225' }}>
								Update Information
							</Button>
						</div>
					)}
				</div>
			) : (
				<div>
					<p>Please Update Your Account Details</p>
					<Button
						variant='primary'
						onClick={handlePostShow}
						style={{ backgroundColor: '#004225' }}>
						Add Account Details
					</Button>
				</div>
			)}
			<div className='linked-accounts-container'>
				<div className='account-section-title'> Plaid Accounts</div>

				<div className='button-div'>
					<Button onClick={linkAccount} style={{ backgroundColor: '#004225' }}>
						Connect a bank account
					</Button>
				</div>
			</div>
			<div className='linked-accounts-container'>
				<div className='account-section-title'> Credentials</div>

				<div className='button-div'>
					<Button
						variant='primary'
						onClick={handlePasswordShow}
						style={{ backgroundColor: '#004225' }}>
						Change Password
					</Button>
				</div>
			</div>
			<Modal show={postShow} onHide={handlePostClose}>
				<Modal.Header closeButton>
					<Modal.Title>Account Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={postUserInfo}>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='First Name'
									name='fname'
									value={postUserObject.fname}
									onChange={handlePostChange}
									required
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Last Name'
									name='lname'
									value={postUserObject.lname}
									onChange={handlePostChange}
									required
								/>
							</Form.Group>
						</Form.Row>

						<Form.Group>
							<Form.Label>Address</Form.Label>
							<Form.Control
								placeholder='1234 Main St'
								name='add1'
								value={postUserObject.add1}
								onChange={handlePostChange}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Address 2</Form.Label>
							<Form.Control
								placeholder='Apartment, studio, or floor'
								name='add2'
								value={postUserObject.add2}
								onChange={handlePostChange}
							/>
						</Form.Group>

						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>City</Form.Label>
								<Form.Control
									placeholder='City'
									name='city'
									value={postUserObject.city}
									onChange={handlePostChange}
									required
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>State</Form.Label>
								<Form.Control
									as='select'
									name='state'
									//value={postUserObject.state}
									onChange={handlePostChange}>
									<option>Choose...</option>
									<option value='AL'>AL</option>
									<option value='AK'>AK</option>
									<option value='AR'>AR</option>
									<option value='AZ'>AZ</option>
									<option value='CA'>CA</option>
									<option value='CO'>CO</option>
									<option value='CT'>CT</option>
									<option value='DC'>DC</option>
									<option value='DE'>DE</option>
									<option value='FL'>FL</option>
									<option value='GA'>GA</option>
									<option value='HI'>HI</option>
									<option value='IA'>IA</option>
									<option value='ID'>ID</option>
									<option value='IL'>IL</option>
									<option value='IN'>IN</option>
									<option value='KS'>KS</option>
									<option value='KY'>KY</option>
									<option value='LA'>LA</option>
									<option value='MA'>MA</option>
									<option value='MD'>MD</option>
									<option value='ME'>ME</option>
									<option value='MI'>MI</option>
									<option value='MN'>MN</option>
									<option value='MO'>MO</option>
									<option value='MS'>MS</option>
									<option value='MT'>MT</option>
									<option value='NC'>NC</option>
									<option value='NE'>NE</option>
									<option value='NH'>NH</option>
									<option value='NJ'>NJ</option>
									<option value='NM'>NM</option>
									<option value='NV'>NV</option>
									<option value='NY'>NY</option>
									<option value='ND'>ND</option>
									<option value='OH'>OH</option>
									<option value='OK'>OK</option>
									<option value='OR'>OR</option>
									<option value='PA'>PA</option>
									<option value='RI'>RI</option>
									<option value='SC'>SC</option>
									<option value='SD'>SD</option>
									<option value='TN'>TN</option>
									<option value='TX'>TX</option>
									<option value='UT'>UT</option>
									<option value='VT'>VT</option>
									<option value='VA'>VA</option>
									<option value='WA'>WA</option>
									<option value='WI'>WI</option>
									<option value='WV'>WV</option>
									<option value='WY'>WY</option>
								</Form.Control>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>Zip Code</Form.Label>
								<Form.Control
									name='zip'
									placeholder='00000'
									value={postUserObject.zip}
									onChange={handlePostChange}
									required
								/>
							</Form.Group>
						</Form.Row>

						<Form.Group>
							<Form.Label>Phone</Form.Label>
							<Form.Control
								placeholder='(555) 555-555'
								name='ph'
								value={postUserObject.ph}
								onChange={handlePostChange}
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={handlePostClose}
						style={{ backgroundColor: '#004225' }}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={postUserInfo}
						style={{ backgroundColor: '#004225' }}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			{/* Update Information Modal */}
			<Modal show={updateShow} onHide={handleUpdateClose}>
				<Modal.Header closeButton>
					<Modal.Title>Update Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={updateUserInfo}>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type='text'
									name='fname'
									defaultValue={userInfo.firstName}
									onChange={handleUpdateChange}
									required
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type='text'
									name='lname'
									defaultValue={userInfo.lastName}
									onChange={handleUpdateChange}
									required
								/>
							</Form.Group>
						</Form.Row>
						<Form.Group>
							<Form.Label>Address</Form.Label>
							<Form.Control
								name='add1'
								defaultValue={userInfo.addressOne}
								onChange={handleUpdateChange}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Address 2</Form.Label>
							<Form.Control
								name='add2'
								defaultValue={userInfo.addressTwo}
								onChange={handleUpdateChange}
							/>
						</Form.Group>

						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>City</Form.Label>
								<Form.Control
									name='city'
									defaultValue={userInfo.city}
									onChange={handleUpdateChange}
									required
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>State</Form.Label>
								<Form.Control
									as='select'
									name='state'
									defaultValue={userInfo.state}
									onChange={handleUpdateChange}>
									<option>Choose...</option>
									<option value='AL'>AL</option>
									<option value='AK'>AK</option>
									<option value='AR'>AR</option>
									<option value='AZ'>AZ</option>
									<option value='CA'>CA</option>
									<option value='CO'>CO</option>
									<option value='CT'>CT</option>
									<option value='DC'>DC</option>
									<option value='DE'>DE</option>
									<option value='FL'>FL</option>
									<option value='GA'>GA</option>
									<option value='HI'>HI</option>
									<option value='IA'>IA</option>
									<option value='ID'>ID</option>
									<option value='IL'>IL</option>
									<option value='IN'>IN</option>
									<option value='KS'>KS</option>
									<option value='KY'>KY</option>
									<option value='LA'>LA</option>
									<option value='MA'>MA</option>
									<option value='MD'>MD</option>
									<option value='ME'>ME</option>
									<option value='MI'>MI</option>
									<option value='MN'>MN</option>
									<option value='MO'>MO</option>
									<option value='MS'>MS</option>
									<option value='MT'>MT</option>
									<option value='NC'>NC</option>
									<option value='NE'>NE</option>
									<option value='NH'>NH</option>
									<option value='NJ'>NJ</option>
									<option value='NM'>NM</option>
									<option value='NV'>NV</option>
									<option value='NY'>NY</option>
									<option value='ND'>ND</option>
									<option value='OH'>OH</option>
									<option value='OK'>OK</option>
									<option value='OR'>OR</option>
									<option value='PA'>PA</option>
									<option value='RI'>RI</option>
									<option value='SC'>SC</option>
									<option value='SD'>SD</option>
									<option value='TN'>TN</option>
									<option value='TX'>TX</option>
									<option value='UT'>UT</option>
									<option value='VT'>VT</option>
									<option value='VA'>VA</option>
									<option value='WA'>WA</option>
									<option value='WI'>WI</option>
									<option value='WV'>WV</option>
									<option value='WY'>WY</option>
								</Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Zip Code</Form.Label>
								<Form.Control
									name='zip'
									defaultValue={userInfo.zip}
									onChange={handleUpdateChange}
									required
								/>
							</Form.Group>
						</Form.Row>

						<Form.Group>
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								name='ph'
								defaultValue={userInfo.phone}
								onChange={handleUpdateChange}
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={handleUpdateClose}
						style={{ backgroundColor: '#004225' }}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={updateUserInfo}
						style={{ backgroundColor: '#004225' }}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={passwordShow} onHide={handlePasswordClose}>
				<Modal.Header closeButton>
					<Modal.Title>Change Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group size='lg' controlId='old-password'>
							<Form.Label>Current Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Current Password'
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
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

						<div className='error-message'>{err}</div>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={handlePasswordClose}
						style={{ backgroundColor: '#004225' }}>
						Close
					</Button>
					<LoaderButton
						type='submit'
						isLoading={isLoading}
						onClick={changePassword}>
						Save Changes
					</LoaderButton>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Account;
