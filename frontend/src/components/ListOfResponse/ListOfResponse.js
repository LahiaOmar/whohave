import { Divider, TablePagination, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { v4 as uui } from 'uuid';
import Map from '../Map';
import MyModal from '../Mymodal';
import CollapsRow from './CollapsRow';
import IllustrationDisplay from '../IllustrationDisplay'
import './style.css';
import { ILLUSTRATION_TYPES } from '../../constants/constants'

function ListOfResponse({ notification, responses, actions: { deleteProduct, deleteResponse } }) {
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
            return { open: true, listPosition: [{ coordinates: store.location.coordinates, draggable: false, type: 'STORE' }] }
          }
          return newState
        case 'PRODUCT':
          pyload = action.pyload
          const storesIndex = responses.products.findIndex(product => product._id === pyload.productId)
          const listCoordinates = responses.stores[storesIndex].map(store => ({
            coordinates: store.location.coordinates, draggable: false, type: 'STORE'
          }))
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
      <div className="table-actions">
        <Typography>
          <h3>List of Response</h3>
        </Typography>
      </div>
      <Divider />
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Description </TableCell>
              <TableCell align="center">Responses</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              responses.products.length == 0 &&
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  <IllustrationDisplay type={ILLUSTRATION_TYPES.NO_RESPONSES} />
                </TableCell>
              </TableRow>
            }
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