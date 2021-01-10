import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from '../../Images/dark_logo_transparent_background.png';

const GeneralNavigation = () => {
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
					<Nav className='mr-auto'>
						<Nav.Link href='/howitworks'>How It Works</Nav.Link>
						<Nav.Link href='/features'>Features</Nav.Link>
						<NavDropdown title='Our Company' id='collasible-nav-dropdown'>
							<NavDropdown.Item href='/about'>About Us</NavDropdown.Item>
							<NavDropdown.Item href='/press'>Press</NavDropdown.Item>
							<NavDropdown.Item href='/careers'>Careers</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link href='/signin'>Sign In</Nav.Link>
						<Nav.Link to='/demo'>Request A Demo</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default GeneralNavigation;
