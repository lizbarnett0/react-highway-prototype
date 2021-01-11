import React, { useState, useEffect } from 'react';
import AccountNav from '../AccountNav';
import { Button, Form, Modal, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import axios from 'axios';
import './account.css';

const Account = () => {
	const [userInfo, setUserInfo] = useState('');
	const [show, setShow] = useState(false);
	const [updatedUserObject, setUpdatedUserObject] = useState('');
	

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		getUserInfo();
	}, []);

	const handleChange = (event) => {
		event.preventDefault();
		setUpdatedUserObject({
			...updatedUserObject,
			[event.target.name]: event.target.innerText,
		});
		console.log(updatedUserObject);
	};

	const getUserInfo = async () => {
		const user = await Auth.currentAuthenticatedUser();
		const token = user.signInUserSession.idToken.jwtToken;
		const url =
			'https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/users/';

		const response = await axios.get(url, {
			headers: {
				'Cog-Token': token,
			},
		});
		const data = await response.data[0];
		setUserInfo(data);
		console.log(userInfo);
	};

	const updateUserInfo = async () => {
		const user = await Auth.currentAuthenticatedUser();
		const token = user.signInUserSession.idToken.jwtToken;
		const email = user.attributes.email;
		const url = `https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/users/${email}`;

		const response = await axios
			.post(url, updatedUserObject, { headers: { 'Cog-Token': token } })
			.then((response) => {
				console.log(response);
			})
			.catch(console.error);

		console.log(response);
	};

	return (
		<div>
			<AccountNav />
			<div className='account-details-title'> Account Details</div>

			{userInfo ? (
				<div className='user-info-container'>
					<p>Username: {userInfo.id}</p>
					<p>
						Name: {userInfo.firstName} {userInfo.lastName}
					</p>
					<p>
						Address: {userInfo.addressOne}, {userInfo.addressTwo}
					</p>
					<p>
						{userInfo.city}, {userInfo.state} {userInfo.zip}
					</p>
					<p>Company: {userInfo.company}</p>
				</div>
			) : (
				<p>hi</p>
			)}

			<Modal show={show} onHide={handleClose}>
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
									// placeholder={userInfo.firstName}
									name='fname'
									value={userInfo.firstName}
									onChange={handleChange}
									required
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type='text'
									placeholder={userInfo.lastName}
									name='lname'
									// value={userInfo.lastName}
									onChange={handleChange}
									required
								/>
							</Form.Group>
						</Form.Row>
						<Form.Group>
							<Form.Label>Address</Form.Label>
							<Form.Control
								placeholder={userInfo.addressOne}
								name='add1'
								// value={userInfo.addressOne}
								onChange={handleChange}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Address 2</Form.Label>
							<Form.Control
								placeholder={userInfo.addressTwo}
								name='add2'
								// value={userInfo.addressOne}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>City</Form.Label>
								<Form.Control
									placeholder={userInfo.city}
									name='city'
									// value={userInfo.city}
									onChange={handleChange}
									required
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>State</Form.Label>
								<Form.Control
									as='select'
									name='state'
									value={userInfo.state}
									onChange={handleChange}>
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
									placeholder={userInfo.zip}
									// value={userInfo.zip}
									onChange={handleChange}
									required
								/>
							</Form.Group>
						</Form.Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={updateUserInfo}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			{!userInfo ? (
				<Button className='post-button'>Fill Out User Information</Button>
			) : (
				<Button variant='primary' onClick={handleShow}>
					Update Information
				</Button>
			)}
		</div>
	);
};

export default Account;
