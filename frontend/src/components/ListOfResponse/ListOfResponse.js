import React from 'react';
import {
  Divider,
  TablePagination,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Grid,
  Fab,
  Badge,
  Tooltip,
} from '@material-ui/core'
import { v4 as uui } from 'uuid';

import './style.css';
import Map from '../Map';
import MyModal from '../Mymodal';
import CollapsRow from './CollapsRow';
import IllustrationDisplay from '../IllustrationDisplay'
import { ILLUSTRATION_TYPES } from '../../constants/constants'
import Carousel from '../Carousel'
import StoreIcon from '@material-ui/icons/Store'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(80vw)',
    height: 'calc(80vh)',
    borderRadius: theme.shape.borderRadius
  },
  card: {
    border: `2px solid ${theme.palette.primary['light']}`,
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    width: '360px'
  }
}))

function ListOfResponse({ notification, responses, actions: { deleteProduct, deleteResponse } }) {
  const classes = useStyles()
  const [responseHeight, setResponseHeight] = React.useState(0)
  const slideRef = React.useRef()

  const slideResponse = () => {
    const height = responseHeight > 0 ? 0 : 100
    setResponseHeight(height)
  }

  return (
    <>
      {
        responses.products.map((product, index) => {
          return (
            <Grid container item justify="center" xs={12} sm={10} md={8}>
              <div style={{ margin: '15px', position: 'relative' }}>
                <Grid container item xs={12} justify="center"
                  style={{
                    position: 'absolute',
                    zIndex: '10',
                    top: '-6%',
                    left: '50%',
                  }}>
                  <div>
                    <Tooltip
                      title="Responses"
                      onClick={() => console.log("click")}>
                      <Fab color="primary" style={{ width: '60px', height: '60px' }}>
                        <Badge badgeContent={100} color="secondary" >
                          <StoreIcon fontSize="samll" />
                        </Badge>
                      </Fab>
                    </Tooltip>
                  </div>
                </Grid>
                <Grid container className={classes.card}
                  justify="center" alignItems="center">
                  <Grid item xs={12}>
                    <Carousel images={product.images} />
                  </Grid>
                  <div style={{ padding: '16px' }}>
                    <Grid container item xs={12} spacing={2}>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography>{product.name}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="body2" color="textSecondary" component="p">
                              {product.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </div>
            </Grid >
          )
        })
      }
    </>
  )
}

export default ListOfResponse