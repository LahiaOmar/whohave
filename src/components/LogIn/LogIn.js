import React from 'react'
import {Button, Grid, TextField, Typography} from '@material-ui/core'
import {AccountCircle, PinDropSharp} from '@material-ui/icons'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function LogIn(props) {

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema : Yup.object({
            email : Yup.string().email("invalid email !").required("Email required !"),
            password : Yup.string().required("Password Required !")
        }),
        onSubmit : values =>{
            props.submitLogIn(JSON.stringify(values))
        }

    })


    return(
        <form className="form-signup" onSubmit={formik.handleSubmit} autoComplete="off">
                <Grid container justify="center" alignItems="center">
                    <AccountCircle style={{fontSize:100, color:'blue'}}/>
                    <Typography component="h1" variant="h5">
                        LogIn
                    </Typography>

                </Grid>

                <Grid id container spacing={2}>
                    
                    <Grid item xs={12}  >
                        <TextField 
                            {...formik.getFieldProps('email')}
                            error={formik.touched.email && formik.errors.email}
                            helperText={formik.touched.email && formik.errors.email
                                        ? formik.errors.email : null}
                            size="small"
                            name="email"
                            id="email"
                            variant="outlined"
                            fullWidth
                            label="Email"
                        />
                    </Grid>
                    <Grid item xs={12}  >
                        <TextField
                            {...formik.getFieldProps('password')}
                            error={formik.touched.password && formik.errors.password}
                            helperText={formik.touched && formik.errors.password
                                        ?formik.errors.password : null}
                            size="small"
                            name="password"
                            id="password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            label="Password"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        LogIn
                    </Button>
                        
                </Grid>
            </form>    
    )
}

export default LogIn