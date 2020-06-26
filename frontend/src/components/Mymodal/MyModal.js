import React from 'react'

import {Button, Modal, Backdrop} from '@material-ui/core'

function MyModal(props){

	const [open, setOpen] = React.useState(false)

	const handleOpen = ()=>{
		setOpen(true)
	}

	const handleClose = ()=>{
		setOpen(false)
	}

	return (
		<div className="modal-btn">
			<Button variant="outlined" onClick={handleOpen}>
				{props.btnTitle}
			</Button>
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
					{props.children}
			</Modal>
		</div >
	)
}

export default MyModal