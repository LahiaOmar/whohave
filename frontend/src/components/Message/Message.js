import React from 'react'
import MyModal from '../Mymodal'
import { Grid, TextField, Button, Typography, Select, Input,
   FormControl, InputLabel, MenuItem, Checkbox, ListItemText } from '@material-ui/core'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import axios from 'axios'
import { SendMessage } from '../ButtonActions'
function Message(props){

  const imagesInput = React.createRef()
  const names = [
		'Oliver Hansen',
		'Van Henry',
		'April Tucker',
		'Ralph Hubbard',
		'Omar Alexander',
		'Carlos Abbott',
		'Miriam Wagner',
		'Bradley Wilkerson',
		'Virginia Andrews',
		'Kelly Snyder',
  ]
  
  const formik = useFormik({
    initialValues : {
      productName : '',
      categories : [],
      description : '',
      images : []
    },
    validationSchema : Yup.object({
      productName : Yup.string()
        .min(5, 'minimum is 5 character')
        .required('required !'),
      productName : Yup.string(),
      images : Yup.array()
    }),
    onSubmit :  async (values) =>{
      console.log("values : ", values)
      values.images = imagesInput.current.files

      console.log(values)

      // try{
      //   let req = await axios.post('http://localhost400:api/product/broadcast')

      // }
      // catch(e){

      // }

    }
  })

  const handleImages = (event)=>{
    console.log(event.files)
  }
  
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
            />
          </Grid>
          <Grid item xs={12}>
								<FormControl className="multi-select-form">
									<InputLabel id="store-types">store types</InputLabel>
									<Select
										{...formik.getFieldProps('categories')}
										error={
											formik.touched.categories && formik.errors.categories 
											? true : false}
										helperText={formik.touched.categories && formik.errors.categories 
											?formik.errors.categories : null}
										labelId="store-types"
										id="demo-mutiple-checkbox"
										multiple
										input={<Input />}
										renderValue={(selected) => selected.join(', ')}
									>
										{names.map((name) => (
											<MenuItem key={name} value={name}>
												<Checkbox checked={formik.values.categories.indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										))}
									</Select>	
								</FormControl>		
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