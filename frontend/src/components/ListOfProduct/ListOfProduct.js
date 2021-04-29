import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider, IconButton, Tooltip, Typography, TablePagination, Grid } from '@material-ui/core'
import { v4 as uui } from 'uuid';
import './style.css'
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown'

const ListOfProduct = ({ products, feedback }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(2)

  return (
    <Paper>
      <div className="list-products">
        <TableContainer component={Paper} className="table-products" style={{ heigth: '100vh' }}>
          <div className="table-actions">
            <Typography>
              <h3>List of product</h3>
            </Typography>
          </div>
          <Divider />
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Images</TableCell>
                <TableCell align="center">Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(product => {
                  const key = uui()
                  return (
                    <TableRow key={key}>
                      <TableCell align="center">{product.productName}</TableCell>
                      <TableCell align="center">{product.description}</TableCell>
                      <TableCell align="center">Images ... </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => feedback(product._id, product.from, 1)} >
                          <ThumbUpIcon
                            fontSize="medium"
                            style={{ padding: '5px', cursor: 'pointer' }}
                            color="primary"
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => feedback(product._id, product.from, 0)}>
                          <ThumbDownIcon
                            fontSize="medium"
                            style={{ padding: '5px', cursor: 'pointer' }}
                            color="action" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 4, 6]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(e, newPage) => {
            setPage(newPage)
          }}
          onChangeRowsPerPage={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10))
          }}
        />
      </div>
    </Paper>
  )
}

export default ListOfProduct