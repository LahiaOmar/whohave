import React from 'react'
import MyModal from '../Mymodal'
import { Grid, TextField, Button, Slider, Typography } from '@material-ui/core'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { SendMessage } from '../ButtonActions'
import { StoresType } from '../StoresType'
import { useAxios } from '../useHooks'
import LoginContext from '../ContextAuth'

function Message(props) {
  const [data, errors, loading, setConfig] = useAxios({})
  const [open, setOpen] = React.useState(false)
  const imagesInput = React.createRef()
  const context = React.useContext(LoginContext)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  let distance = 5

  const formik = useFormik({
    initialValues: {
      productName: '',
      storeTypes: [],
      description: '',
      images: []
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .min(5, 'minimum is 5 character')
        .required('required !'),
      storeTypes: Yup.array()
        .min(1, 'you must select the type(s) of service that your store provide!')
        .required('required !'),
      description: Yup.string(),
      images: Yup.array()
    }),
    onSubmit: (values, { resetForm }) => {
      values.images = imagesInput.current.files
      Object.assign(values, { corrdinates: context.userData.coordinates })
      Object.assign(values, { type: context.type })
      Object.assign(values, { userId: context.userData._id })
      Object.assign(values, { distance })
      const config = {
        url: process.env.REACT_APP_PATH_PRODUCT_BROADCAST,
        method: 'POST',
        data: values
      }
      resetForm()
      handleClose()
      setConfig(config)
    }
  })

  const KmToMetre = km => km * 1000

  const getDistanceValue = value => distance = KmToMetre(value)

  return (

    <form id="msg-product" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Describe the product that you looking for
            </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...formik.getFieldProps('productName')}
            variant="outlined"
            label="Product Name"
            fullWidth
            error={
              formik.touched.productName &&
              formik.errors.productName
            }
            helperText={
              formik.touched.productName &&
              formik.errors.productName
            }
          />
        </Grid>
        <Grid item xs={12}>
          <StoresType formik={formik} showAddNewType={false} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...formik.getFieldProps('description')}
            variant="outlined"
            label="Description"
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            ref={imagesInput}
            accept="image/*"
            style={{ display: "none" }}
            multiple
            id="contained-button-file"
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload image
              </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Typography id="distance-slider">
            Distance
            </Typography>
          <Slider
            className="distance-slider"
            defaultValue="5"
            getAriaValueText={getDistanceValue}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={distance}
            max={50}
          />
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          type="submit">
          BROADCAST
          </Button>
      </Grid>
    </form>

  )
}

export default Message