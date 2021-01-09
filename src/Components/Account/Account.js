import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import PostUserInfo from './PostUserInfo'
import UpdateUserInfo from './UpdateUserInfo';
import UserInfo from './UserInfo';

const Account = () => {
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);
	

	return (
		<div>
			<UserInfo />
			<Modal
				show={showModal}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
				className='post-modal-form'>
				<PostUserInfo handleClose={handleClose} />
			</Modal>
			<Modal
				show={showModal}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
				className='update-modal-form'>
				<UpdateUserInfo handleClose={handleClose} />
			</Modal>
			<Button className='post-button' onClick={handleShow}>
				Submit
			</Button>
			<Button className='update-button' onClick={handleShow}>
				Update User Info
			</Button>
		</div>
	);
};

export default Account;
