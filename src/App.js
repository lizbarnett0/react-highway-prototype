import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AppContext } from './libs/contextLib';
import { Auth } from 'aws-amplify';
import Routes from './Routes';
import Logo from './Images/dark_logo_transparent_background.png';

function App() {
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		onLoad();
	}, []);

	async function onLoad() {
		try {
			await Auth.currentSession();
			setIsAuthenticated(true);
		} catch (error) {
			if (error !== 'No current user') {
				alert(error);
			}
		}

		setIsAuthenticating(false);
	}

	const signOut = async () => {
		await Auth.signOut();
		setIsAuthenticated(false);
	};

	return (
		!isAuthenticating && (
			<div className='App'>
				<Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
					<Navbar.Brand href='/'>
						<img
							src={Logo}
							width='150'
							height='50'
							className='d-inline-block align-top'
							alt='Highway Benefits logo'
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='mr-auto'>
							<Nav.Link href='/howitworks'>How It Works</Nav.Link>
							<Nav.Link to='/demo'>Request A Demo</Nav.Link>
							<NavDropdown title='Our Company' id='collasible-nav-dropdown'>
								<NavDropdown.Item href='/about'>About Us</NavDropdown.Item>
								<NavDropdown.Item href='/press'>Press</NavDropdown.Item>
								<NavDropdown.Item href='/careers'>Careers</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav>
							{isAuthenticated ? (
								<Nav className='ml-auto'>
									<NavDropdown
										title='My Dashboard'
										id='collasible-nav-dropdown'>
										<NavDropdown.Item href='/account'>
											Account Details
										</NavDropdown.Item>
										<NavDropdown.Item href='/press'>
											Loan Summary
										</NavDropdown.Item>
										<NavDropdown.Item href='/careers'>
											Transactions
										</NavDropdown.Item>
									</NavDropdown>
									<Nav.Link onClick={signOut}>Sign Out</Nav.Link>
								</Nav>
							) : (
								<Nav.Link href='/signin'>Sign In</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
					<Routes />
				</AppContext.Provider>
			</div>
		)
	);
}

export default App;
