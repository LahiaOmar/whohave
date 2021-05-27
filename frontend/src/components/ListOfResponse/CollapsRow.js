import { Badge, Box, Collapse, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MailIcon from '@material-ui/icons/Mail';
import RoomIcon from '@material-ui/icons/Room';
import React from 'react';
import { v4 as uui } from 'uuid';
import './style.css';


const CollapsRow = ({ product, stores, deleteProduct, deleteResponse, mapDispatch }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <TableRow>
        <TableCell align="center">
          <IconButton size="sm" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          {product.name}
        </TableCell>
        <TableCell align="center">
          {product.description}
        </TableCell>
        <TableCell align="center">
          <Tooltip title={`You have ${stores.length} responses`}>
            <IconButton>
              <Badge badgeContent={stores.length} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell align="center">
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
                      const key = uui()
                      return (
                        <TableRow key={key}>
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

export default CollapsRow