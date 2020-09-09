import React from 'react'

import {Button, Modal, Backdrop, Grid} from '@material-ui/core'
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

function MyModal({btnTitle, children, MyButton, open, handleClose, handleOpen}){

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
				<div style={{display : 'flex', flexDirection : 'column',  backgroundColor : 'white'}}>
					<div>
						<CloseSharpIcon style={{float : 'right', cursor : 'pointer' }} onClick={handleClose} />
					</div>
					<div>
						{children}
					</div>
				</div>
			</Modal>
		</div >
	)
}

export default MyModal