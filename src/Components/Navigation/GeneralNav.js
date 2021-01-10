import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
						<Nav.Link>
							<Link to='/howitworks'>How It Works</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to='/features'>Features</Link>
						</Nav.Link>
						<NavDropdown title='Our Company' id='collasible-nav-dropdown'>
							<NavDropdown.Item>
								<Link to='/about'>About Us</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link to='/press'>Press</Link>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link>
							<Link to='/signin'>Sign In</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to='/demo'>Request A Demo</Link>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default GeneralNavigation;
