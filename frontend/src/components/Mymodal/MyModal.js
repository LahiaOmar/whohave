import React from 'react'

import {Button, Modal, Backdrop} from '@material-ui/core'

function MyModal({btnTitle, children, MyButton}){

	const [open, setOpen] = React.useState(false)

	const handleOpen = ()=>{
		setOpen(true)
	}

	const handleClose = ()=>{
		setOpen(false)
	}

	return (
		<div className="modal-btn">
			{
				MyButton
				? <MyButton onClick={handleOpen}/>
				:<Button variant="outlined" onClick={handleOpen}>
					{btnTitle}
				</Button>
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
					{children}
			</Modal>
		</div >
	)
}

export default MyModal