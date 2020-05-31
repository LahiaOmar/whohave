import React from 'react'

import {Button,
        Grid, TextField, Link,
        Typography, Divider} from '@material-ui/core'

function SignUp() {

    return (
            <form className="form-signup">
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} >
                        <TextField 
                            name="Your Name"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField 
                            name="Your Last Name"
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}  >
                        <TextField 
                            name="Email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}  >
                        <TextField 
                            name="Password"
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="password"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}  >
                        <TextField 
                            name="Repat Password"
                            variant="outlined"
                            required
                            fullWidth
                            id="repat-password"
                            label="repat-password"
                            autoFocus
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"

                    >Sign Up</Button>
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                </Grid>
                <Divider />
                <span> OR CONNECT WITH </span>
                <Divider />
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"

                    >GOOGLE ACCOUNT</Button>
            </form>    
    )
}

export default SignUp