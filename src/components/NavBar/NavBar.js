import React from 'react'

import Menu from '../Menu'
import Authentication from '../Authentication'
import Logo from '../Logo'

import {AppBar, Grid} from '@material-ui/core'

function NavBar(){
    return(
        <AppBar position="static">
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Logo />
                <Menu />
                <Authentication />
            </Grid>
        </AppBar>
    )
}

export default NavBar