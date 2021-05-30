import { Divider, IconButton, TablePagination, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React from 'react';
import { v4 as uui } from 'uuid';
import './style.css';
import ImageIcon from '@material-ui/icons/Image';
import MyModal from '../Mymodal/MyModal';
import Carousel from '../Carousel'
import IllustrationDisplay from '../IllustrationDisplay'
import { ILLUSTRATION_TYPES } from '../../constants/constants'

const ListOfProduct = ({ products, feedback }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(2)
  const [images, setImages] = React.useState([])
  const [showImages, setShowImages] = React.useState(false)

  return (
    <div className="list-products">
      <Paper>
        <TableContainer component={Paper} className="table-products">
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
              {
                products.length == 0 &&
                <TableRow className="dashboard-msg">
                  <TableCell align="center" colSpan={5}>
                    <IllustrationDisplay type={ILLUSTRATION_TYPES.NO_PRODUCTS} />
                  </TableCell>
                </TableRow>
              }
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(product => {
                  const key = uui()
                  return (
                    <TableRow key={key}>
                      <TableCell align="center">{product.name}</TableCell>
                      <TableCell align="center">{product.description}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            setImages(product.images)
                            setShowImages(true)
                          }}
                        >
                          <ImageIcon />
                        </IconButton>
                      </TableCell>
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
      </Paper>
      <MyModal
        open={showImages}
        handleClose={() => {
          setShowImages(false)
          setImages([])
        }}
      >
        <Carousel images={images} />
      </MyModal>
    </div>
  )
}




export default ListOfProduct