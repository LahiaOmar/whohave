import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import NotListedLocationOutlinedIcon from '@material-ui/icons/NotListedLocationOutlined';
function Logo() {
    return (
        <Grid item xs={2} className="nav-logo">
            <NotListedLocationOutlinedIcon fontSize="large"/>
            <Typography>
                WhoHave?
            </Typography>
        </Grid>
    )
}

export default Logo