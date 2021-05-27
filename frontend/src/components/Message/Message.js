import React from 'react'
import { Grid, TextField, Button, Slider, Typography } from '@material-ui/core'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { StoresType } from '../StoresType'
import useAxios from '../useHooks/useAxios'
import LoginContext from '../ContextAuth'
import CountrySelector from '../CountrySelector/'

function Message({ sendProduct }) {
  const [data, errors, loading, setConfig] = useAxios({})
  const [open, setOpen] = React.useState(false)
  const [distance, setDistance] = React.useState(5)
  const imagesInput = React.createRef()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      types: [],
      description: '',
      city: '',
      country: '',
      files: []
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'minimum is 5 character')
        .required('required !'),
      types: Yup.array()
        .min(1, 'you must select the type(s) of service that your store provide!')
        .required('required !'),
      description: Yup.string(),
      city: Yup.string().required('must select a city'),
      country: Yup.string().required('must select a country'),
      files: Yup.array()
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("values ", values)
      resetForm()
      handleClose()
      sendProduct(values)
    }
  })

  return (
    <form id="msg-product" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Describe the Product
            </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...formik.getFieldProps('name')}
            variant="outlined"
            label="Product Name"
            fullWidth
            error={
              formik.touched.name &&
              formik.errors.name
            }
            helperText={
              formik.touched.name &&
              formik.errors.name
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
            onChange={(e) => {
              console.log("files", e.target.files.item(0))
              formik.setFieldValue('files', Array.from(e.target.files))
            }}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload image
              </Button>
          </label>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <CountrySelector formik={formik} />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            type="submit">
            BROADCAST
          </Button>
        </Grid>
      </Grid>
    </form>

  )
}

export default Message