import React, {useState} from 'react';
import { Auth } from 'aws-amplify';
import { Form, Button, Col } from 'react-bootstrap';

const UpdateUserInfo = ({ handleUpdateClose, userInfo }) => {
    const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo)
    
    
    const handleChange = (event) => {
			event.preventDefault();
			setUpdatedUserInfo({ ...updatedUserInfo, [event.target.name]: event.target.value });
		};

	const updateUserInfo = async () => {
		const user = await Auth.currentAuthenticatedUser();
		const token = user.signInUserSession.idToken.jwtToken;
		const email = user.attributes.email;
		const url = `https://o2rnmbhkc7.execute-api.us-east-2.amazonaws.com/dev/users/${email}`;

		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Cog-Token': token,
			},
			updatedUserInfo,
		});
		const data = await response.json();
		console.log(data);
		handleUpdateClose();
	};
	return (
		<div className='user-post-container'>
			<Form>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter First Name'
							name='fname'
							value={updatedUserInfo.firstName}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Last Name'
							name='lname'
							value={updatedUserInfo.lastName}
							onChange={handleChange}
							required
						/>
					</Form.Group>
				</Form.Row>

				<Form.Group>
					<Form.Label>Address</Form.Label>
					<Form.Control
						placeholder='1234 Main St'
						name='add1'
						value={updatedUserInfo.addressOne}
						onChange={handleChange}
						required
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Address 2</Form.Label>
					<Form.Control
						placeholder='Apartment, studio, or floor'
						name='add2'
						value={updatedUserInfo.addressTwo}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>City</Form.Label>
						<Form.Control
							placeholder='City'
							name='city'
							value={updatedUserInfo.city}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group as={Col}>
						<Form.Label>State</Form.Label>
						<Form.Control
							as='select'
							name='state'
							value={updatedUserInfo.state}
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
							value={updatedUserInfo.zip}
							onChange={handleChange}
							required
						/>
					</Form.Group>
				</Form.Row>

				<Button variant='primary' type='submit' onClick={updateUserInfo}>
					Submit
				</Button>
				<Button variant='primary' type='submit' onClick={handleUpdateClose}>
					Close
				</Button>
			</Form>
		</div>
	);
};

export default UpdateUserInfo;
