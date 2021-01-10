import React, {useState} from 'react';
import { Redirect} from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from '../../Images/dark_logo_transparent_background.png';

const AccountNav = () => {
	const [redirect, setRedirect] = useState(false)


	const signOut = async () => {
		try {
			await Auth.signOut();
			setRedirect(true)
		} catch (error) {
			console.log(error);
		}
	};

	if (redirect){
		return <Redirect to='/' />;
	}
	return (
		<div>
			<Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
				<img
					src={Logo}
					width='150'
					height='50'
					className='d-inline-block align-top'
					alt='Highway Benefits logo'
				/>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='ml-auto'>
						<NavDropdown title='My Dashboard' id='collasible-nav-dropdown'>
							<NavDropdown.Item href='/account'>
								Account Details
							</NavDropdown.Item>
							<NavDropdown.Item href='/press'>Loan Summary</NavDropdown.Item>
							<NavDropdown.Item href='/careers'>Transactions</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>Sign Out</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link onClick={signOut}>Sign Out</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default AccountNav;
