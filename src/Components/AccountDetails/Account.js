import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import axios from 'axios';
import './account.css';

const Account = () => {
	const [userInfo, setUserInfo] = useState('');
	const [updateShow, setUpdateShow] = useState(false);
	const [postShow, setPostShow] = useState(false);
	const [updatedUserObject, setUpdatedUserObject] = useState('');
	const [postUserObject, setPostUserObject] = useState({
		fname: '',
		lname: '',
		add1: '',
		add2: '',
		city: '',
		state: '',
		zip: '',
		ph: ''
	});
	

	const handlePostClose = () => setPostShow(false);
	const handlePostShow = () => setPostShow(true);

	const handleUpdateClose = () => setUpdateShow(false);
	const handleUpdateShow = () => setUpdateShow(true);

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



const handlePostChange = (event) => {
	event.preventDefault();
	setPostUserObject({ ...postUserObject, [event.target.name]: event.target.value });
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
		.catch(console.error);

	console.log(response);
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
			<div className='account-details-title'> Account Details</div>

			{userInfo ? (
				<div className='user-info-container'>
					<p>Welcome {userInfo.id}!</p>
					<div className='account-details-title'> Account Details</div>
					<p>
						Name: {userInfo.firstName} {userInfo.lastName}
					</p>
					<p>Address:</p>
					<p>
						{userInfo.addressOne}, {userInfo.addressTwo}
					</p>
					<p>
						{userInfo.city}, {userInfo.state} {userInfo.zip}
					</p>
					<p>Phone Number: {userInfo.phone}</p>
				</div>
			) : (
				<p>Please Update Your Account Details</p>
			)}
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
									value={postUserObject.state}
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
								name='add1'
								value={postUserObject.ph}
								onChange={handlePostChange}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Company</Form.Label>
							<Form.Control
								placeholder='(555) 555-555'
								name='add1'
								value={postUserObject.add1}
								onChange={handlePostChange}
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handlePostClose}>
						Close
					</Button>
					<Button variant='primary' onClick={postUserInfo}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

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
					<Button variant='secondary' onClick={handleUpdateClose}>
						Close
					</Button>
					<Button variant='primary' onClick={updateUserInfo}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			{!userInfo ? (
				<Button variant='primary' onClick={handlePostShow}>
					Add Account Details
				</Button>
			) : (
				<Button variant='primary' onClick={handleUpdateShow}>
					Update Information
				</Button>
			)}
		</div>
	);
};

export default Account;
