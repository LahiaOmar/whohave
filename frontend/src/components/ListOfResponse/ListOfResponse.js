import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TableFooter from '@material-ui/core/TableFooter'
import { useAxios } from '../useHooks';
import LoginContext from '../ContextAuth';
import Message from '../Message'
import constants from '../../constants'
import Axios from 'axios';
import MyModal from '../Mymodal';
import Map from '../Map'
import { Button, Collapse, Typography, Tooltip, Divider } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import DeleteIcon from '@material-ui/icons/Delete';
import './style.css'

function ListOfResponse({ notifications, dispatch }) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(false)
  const [mapPositions, mapDispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ALL_SELECTED':
          const storesPosition = notifications.reduce((prev, curr) => {
            if (curr.isSelected) {
              prev.push(curr.informations.location)
            }
            return prev
          }, [])
          return storesPosition
        case 'SINGLE':
          return [action.location]
        default:
          throw ("error action type")
      }
    }, [])
  const context = React.useContext(LoginContext)

  React.useEffect(() => {
    const findSelected = notifications.find(notification => notification.isSelected === true)
    setSelected(findSelected ? true : false)
  }, [notifications])

  const removeProduct = async (itemIds) => {
    let config = {
      method: 'POST',
      url: process.env.REACT_APP_UPDATE_USER,
      data: {
        type: context.type,
        userId: context.userData._id,
        forUpdate: {
          $pull: {
            notifications: {
              _id: {
                $in: itemIds
              }
            }
          }
        }
      }
    }
    try {
      await Axios(config)
    }
    catch (e) {

    }
  }

  const deleteItems = async () => {
    const notifCheckedIds = notifications.reduce((prev, curr) => {
      if (curr.isSelected) {
        prev.push(curr._id)
      }
      return prev
    }, [])
    await removeProduct(notifCheckedIds)
    dispatch({
      type: constants.NOTIFICATIONS_REDUCER.DELETE,
      idsArr: notifCheckedIds
    })
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <div className="table-actions" style={
          selected ? {
            animation: 'bg-animation 0.3s ease-in-out forwards'
          } : {}
        }>
          {
            selected ?
              <>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete" onClick={() => deleteItems()}>
                    <DeleteIcon size="large" color="action" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Map">
                  <IconButton >
                    <RoomIcon size="large" />
                  </IconButton>
                </Tooltip>
              </>
              : <Typography>
                <h3>List of Response</h3>
              </Typography>
          }
        </div>
        <Divider />
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
                SELECT ALL
              </TableCell>
              <TableCell align="left">ProductName</TableCell>
              <TableCell align="left">Store Name</TableCell>
              <TableCell align="left">address</TableCell>
              <TableCell align="left">Show On Map</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((product, i) => {
              const { informations, _id, isSelected } = product
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
                  <TableCell align="left">{informations.productName}</TableCell>
                  <TableCell align="left">{informations.storeName}</TableCell>
                  <TableCell align="left">{informations.address}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setModalOpen(true)
                        mapDispatch({ type: 'SINGLE', location: informations.location })
                      }}
                    >show on Map</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div id="table-footer-action">
        <Button variant="contained" color="secondary" onClick={() => deleteItems()}>Delete</Button>
        <MyModal
          btnTitle="show on the map"
          open={modalOpen}
          handleClose={() => {
            setModalOpen(false)
            mapDispatch({ type: 'ALL_SELECTED' })
          }}
          handleOpen={() => {
            setModalOpen(true)
            mapDispatch({ type: 'ALL_SELECTED' })
          }}>
          <Map
            listOfPosition={mapPositions}
            selfPositionOnChange={(lngLat) => console.log("lngLat", lngLat)}
          />

        </MyModal>
      </div> */}
    </div>
  )
}

export default ListOfResponse