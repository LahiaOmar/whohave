import React from 'react'
import MyModal from '../Mymodal'
import { Grid, TextField, Button, Typography} from '@material-ui/core'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {SendMessage} from '../ButtonActions'
import {StoresType} from '../StoresType'
import {useAxios}  from '../useHooks'
import LoginContext from '../ContextAuth'

function Message(props){
  const [data, errors, loading, setConfig] = useAxios({})
  const imagesInput = React.createRef()
  const context = React.useContext(LoginContext)

  const formik = useFormik({
    initialValues : {
      productName : '',
      storeTypes : [],
      description : '',
      images : []
    },
    validationSchema : Yup.object({
      productName : Yup.string()
        .min(5, 'minimum is 5 character')
        .required('required !'),
      storeTypes : Yup.array()
        .min(1, 'you must select the type(s) of service that your store provide!')
        .required('required !'),
      description : Yup.string(),
      images : Yup.array()
    }),
    onSubmit : (values) =>{
      values.images = imagesInput.current.files
      Object.assign(values,{ corrdinates : context.userData.coordinates}) 
      const config = {
        url : process.env.REACT_APP_PATH_PRODUCT_BROADCAST,
        method : 'POST',
        data : values
      }
      console.log("config obj", config)
      setConfig(config)
    }
  })
  
  return (
    <MyModal btnTitle="send product" MyButton={SendMessage}>
      <form id="msg-product" onSubmit={formik.handleSubmit}>
        <Grid container  spacing={2} justify="center">
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
								<StoresType formik={formik} showAddNewType={false}/>
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
              style={{display:"none"}}              
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
          <Button 
            variant="contained"
            color="secondary"
            type="submit">
            BROADCAST
          </Button>
        </Grid>
      </form>
    </MyModal>
  )
}

export default Message