import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import MyModal from '../Mymodal';
import Map from '../Map'
import { Box, Collapse, Typography, Tooltip, Divider, TablePagination, Badge } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import DeleteIcon from '@material-ui/icons/Delete';
import './style.css'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MailIcon from '@material-ui/icons/Mail'
import { v4 as uui } from 'uuid'

const CollapsRow = ({ product, stores, deleteProduct, deleteResponse, mapDispatch }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="sm" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {product.productName}
        </TableCell>
        <TableCell>
          {product.description}
        </TableCell>
        <TableCell>
          <Tooltip title={`You have ${stores.length} responses`}>
            <IconButton>
              <Badge badgeContent={stores.length} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Show All Responses" color="primary">
            <IconButton
              label="Show All Responses"
              onClick={() => mapDispatch({
                type: 'PRODUCT',
                pyload: {
                  productId: product._id
                }
              })}>
              <RoomIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Product" color="secondary">
            <IconButton
              label="Delete Product"
              onClick={() => deleteProduct(product._id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      Store Name
                    </TableCell>
                    <TableCell align="center">
                      address
                    </TableCell>
                    <TableCell align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    stores.map(store => {
                      return (
                        <TableRow>
                          <TableCell align="center">
                            {store.name}
                          </TableCell>
                          <TableCell align="center">
                            {store.address}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Show All Responses" color="primary">
                              <IconButton
                                label="Show this Response"
                                onClick={() => mapDispatch({
                                  type: 'STORE',
                                  pyload: { productId: product._id, storeId: store._id }
                                })}>
                                <RoomIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete response" color="secondary">
                              <IconButton
                                label="Delete this response"
                                onClick={() => deleteResponse(product._id, store._id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

function ListOfResponse({ notification, responses, actions: { deleteProduct, deleteResponse } }) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(2)
  const [mapState, mapDispatch] = React.useReducer(
    (state, action) => {
      let newState = { ...state }
      let pyload = {}
      switch (action.type) {
        case 'STORE':
          pyload = action.pyload
          const storeIndex = responses.products.findIndex(product => product._id === pyload.productId)
          if (storeIndex >= 0) {
            const store = responses.stores[storeIndex].find(store => store._id === pyload.storeId)
            return { open: true, listPosition: [store.location.coordinates] }
          }
          return newState
        case 'PRODUCT':
          pyload = action.pyload
          const storesIndex = responses.products.findIndex(product => product._id === pyload.productId)
          const listCoordinates = responses.stores[storesIndex].map(store => store.location.coordinates)
          return { open: true, listPosition: listCoordinates }
        case 'CLOSE':
          return { ...state, open: false }
        case 'OPEN':
          return { ...state, open: true }
        default:
          throw ("error action type")
      }
    }, { open: false, listPosition: [] })

  return (
    <Paper>
      <div className="table-actions" style={
        selected ? {
          animation: 'bg-animation 0.3s ease-in-out forwards'
        } : {}
      }>
        {
          selected ?
            <>
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={() => console.log("selecte all")}>
                  <DeleteIcon size="large" color="action" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Map">
                <IconButton aria-label="map" onClick={() => {
                  setModalOpen(true)
                  mapDispatch({ type: 'ALL_SELECTED' })
                }}>
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
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                  onChange={() => console.log("click")}
                />
                SELECT ALL
              </TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="left">Description </TableCell>
              <TableCell align="left">Responses</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              responses.products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => {
                  const key = uui()
                  return <CollapsRow
                    key={key}
                    product={product}
                    stores={responses.stores[index]}
                    deleteProduct={deleteProduct}
                    deleteResponse={deleteResponse}
                    mapDispatch={mapDispatch} />
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 4, 6]}
        component="div"
        count={responses.products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(e, newPage) => {
          setPage(newPage)
        }}
        onChangeRowsPerPage={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
        }}
      />
      <div id="table-footer-action">
        <MyModal
          useBtn={false}
          open={mapState.open}
          handleClose={() => {
            mapDispatch({ type: 'CLOSE' })
          }}
          handleOpen={() => {
            mapDispatch({ type: 'OPEN' })
          }}>
          <Map
            markersPosition={mapState.listPosition} />
        </MyModal>
      </div>
    </Paper>
  )
}

export default ListOfResponse