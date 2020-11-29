import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TableFooter from '@material-ui/core/TableFooter'
import { Button, Typography } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid';
import { useAxios } from '../useHooks';
import LoginContext from '../ContextAuth';
import constants from '../../constants'
import './style.css'

const ListOfProduct = ({ notifications, dispatch }) => {
  const [response, loading, error, setConfig] = useAxios({})
  const context = React.useContext(LoginContext)

  const sendResponse = (consumerId, productId, productName) => {
    const from = context.userData._id
    let config = {
      method: 'POST',
      url: process.env.REACT_APP_PATH_PRODUCT_BROADCAST,
      data: {
        type: context.type,
        from: from,
        to: consumerId,
        productId,
        productName
      }
    }
    setConfig(config)
  }

  const deleteSelectedProduct = () => {
    const notifCheckedIds = notifications.reduce((prev, curr) => {
      if (curr.isSelected) {
        prev.push(curr._id)
      }
      return prev
    }, [])
    dispatch({
      type: constants.NOTIFICATIONS_REDUCER.DELETE,
      idsArr: notifCheckedIds
    })
  }

  const responseUserHandler = (consumerId, productId, productName) => {
    sendResponse(consumerId, productId, productName)
    dispatch({
      type: constants.NOTIFICATIONS_REDUCER.DELETE,
      idsArr: [productId]
    })
  }

  return (
    <div className="list-products">
      <Typography>
        <h1>List of product</h1>
      </Typography>
      <TableContainer component={Paper} className="table-products" style={{ heigth: '100vh' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                  onChange={(e) => dispatch({
                    type: constants.NOTIFICATIONS_REDUCER.CHECK_ALL,
                    isSelected: e.target.checked
                  })}
                />
                select all
              </TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Images</TableCell>
              <TableCell align="left">Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((product, i) => {
              const { informations, _id, isSelected, from } = product
              const { productName, description } = informations
              return (
                <TableRow key={_id}>
                  <TableCell align="left">
                    <Checkbox
                      onChange={() => dispatch({
                        type: constants.NOTIFICATIONS_REDUCER.CHECK_BYID, id: _id
                      })}
                      checked={isSelected}
                    />
                  </TableCell>
                  <TableCell align="left">{productName}</TableCell>
                  <TableCell align="left">{description}</TableCell>
                  <TableCell align="left">Images ... </TableCell>
                  <TableCell align="left">
                    <Button variant="contained" color="primary" onClick={() => responseUserHandler(from, _id, productName)}>
                      send response
                  </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <button onClick={() => deleteSelectedProduct()}> delete </button>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ListOfProduct