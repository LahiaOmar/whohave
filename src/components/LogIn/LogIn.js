import React from 'react'

import {Button,
    Grid, TextField, Link,
    Typography, Divider} from '@material-ui/core'

function LogIn() {
    return(
        <form className="form-signup">
                <Typography component="h1" variant="h5">
                    LogIn
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField 
                            name="Your email"
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
                            name="Password"
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="password"
                            autoFocus
                        />
                    </Grid>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">
                            LogIn
                    </Button>
                </Grid> 
            </form>
    )
}

export default LogIn