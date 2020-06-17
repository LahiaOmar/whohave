import React from 'react'
import {Grid} from '@material-ui/core'

function HeadLine(){
    return(
        <div>
            <Grid container justify="center" spacing={1} id="head-line">
                <Grid item id="head-line-info">
                    some information about the app
                </Grid>
                <Grid item id="head-line-start">
                    logo and btn for start
                </Grid>
            </Grid>
        </div>
    )
}

export default HeadLine