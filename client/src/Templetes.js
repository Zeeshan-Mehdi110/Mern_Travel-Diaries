import { Box, Grid } from '@mui/material'
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import StudentsForm from './components/form/StudentsForm'
import StudentsData from './components/students/StudentsData'

const Templetes = () => {
return (
    <Grid container  height={'100vh'} >
        <Grid item md={3} fontFamily={'var(--josefin)'} fontSize={'20px'} style={{'backgroundColor':'#EEEFFB'}}  >
            <Box p={3}>
            <Link to='/' style={{'textDecoration':'none','color':'crimson'}} >Form</Link>
            </Box>
            <Box p={3}>
            <Link to='/studentsdata' style={{'textDecoration':'none','color':'crimson'}} >Students Data</Link>
            </Box>
        </Grid>
        <Grid item md={9}>
            <Routes>
                <Route path='/' element={<StudentsForm />} />
                <Route path='/studentsdata' element={<StudentsData />} />
            </Routes>
        </Grid>
    </Grid>
)
}

export default Templetes
