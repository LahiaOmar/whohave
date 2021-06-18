import React from 'react'

import { Button, Modal, Backdrop, Grid, IconButton, Tooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import './style.css'

function MyModal({ btnTitle, children, MyButton, open, handleClose, handleOpen, useBtn }) {

	return (
		<div className="modal-btn">
			{

				useBtn ?
					MyButton
						? <MyButton onClick={handleOpen} />
						: <Button variant="outlined" onClick={handleOpen}>
							{btnTitle}
						</Button>
					: null
			}

			<Modal
				className="container-modal"
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<>
					<div className="modal-close-btn">
						<Tooltip title="Close" arrow>
							<CloseIcon className="btn-close" fontSize="large" onClick={handleClose} />
						</Tooltip>
					</div>
					{children}
				</>
			</Modal>
		</div >
	)
}

export default MyModal