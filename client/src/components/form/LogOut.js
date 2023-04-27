import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LogOut = () => {
  return (
    <Box>
      <Typography variant='h3' >YOU ARE LOGOUT</Typography>
      <Typography variant='h5' ><Link to="/signUp" >Click here to SignUp</Link></Typography>
    </Box>
  )
}

export default LogOut
