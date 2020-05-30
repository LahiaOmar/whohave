import React from 'react'

import Menu from '../Menu'
import Authentication from '../Authentication'
import Logo from '../Logo'

import {AppBar, Toolbar} from '@material-ui/core'

function NavBar(){
    return(
        <AppBar position="static">
            <Toolbar>
                <Logo />
                <Menu />
                <Authentication />
            </Toolbar>
        </AppBar>
    )
}

export default NavBar