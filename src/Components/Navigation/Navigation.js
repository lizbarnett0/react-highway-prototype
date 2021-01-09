import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Navigation = () => {
	return (
		<div>
			<Navbar bg='dark' variant='dark'>
				<Navbar.Brand href='#home'>Highway</Navbar.Brand>
				<Nav className='ml-auto'>
					<Nav.Link href='#home'>Home</Nav.Link>
					<Nav.Link href='#features'>Features</Nav.Link>
					<Nav.Link href='#pricing'>Pricing</Nav.Link>
					<NavDropdown title='Dropdown' id='basic-nav-dropdown'>
						<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.2'>
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href='#action/3.4'>
							Separated link
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar>
		</div>
	);
};

export default Navigation;
