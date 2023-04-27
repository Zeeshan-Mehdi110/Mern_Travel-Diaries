import { Alert,Box, Button, CircularProgress, Typography } from '@mui/material'
import axios from 'axios'
import { FORM_ERROR } from 'final-form'
import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { Link , useParams } from 'react-router-dom'
import { authActionsTypes } from '../../store/actions/authActions'
import { useState } from 'react'

const EditStudent = () => {
  const { id } = useParams() 
  const dispatch = useDispatch()
  const [editData,setEditData] = useState([])
  return <Form
    onSubmit={ async (data, form) => {
      return await axios.get(`http://localhost:5000/api/students/edit/${id}`)
      .then((result) => {
        console.log(result.data)
        
        dispatch({ 
          type : authActionsTypes.LOGIN,
          student : result.data , 
          token : result.data.token
        })
        setTimeout(() => {
          form.reset({})
          return {}
        }, 2000);
        }).catch(err => {
          console.log(err)
          return { [FORM_ERROR]: err.message }
        })
    }}
    validate={(data) => {
      const errors = {};

      if (!data.name)
        errors.name = "";
      else if (data.name.length < 3)
        errors.name = "name should have at least 3 charecters";

      if (!data.password)
        errors.password = "";
      else if (data.password.length < 6)
        errors.password = "password must be at least 6 charecters";

      return errors
    }}
  >

    {
      ({ handleSubmit, submitting, errors, values, invalid, submitSucceeded, submitError }) => {
        return <Box display={'flex'} justifyContent='center' alignItems={'center'} flexDirection='column'>
          <form onSubmit={handleSubmit} style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'marginTop': '5px', 'maxWidth': '700px', 'padding': '20px', 'boxShadow': '2px 2px 5px rgba(0, 0, 0, 0.3)', 'borderRadius': '3px', "backgroundColor": '#EEEFFB' }} >
            <Box fontSize={'36px'} paddingBottom='24px' color='crimson' sx={{ 'fontFamily': 'var(--josefin)' }} >Edit Student</Box>
            <Box display={'flex'} flexDirection='column' width={600} >
              <Field name="name" component='input' placeholder="Enter your name" style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              {
                values.name && <Box marginBottom={'16px'} color='red' >{errors.name}</Box>
              }
              <Field component='input' type="email" name='email' size='small' placeholder='Enter your email' style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              <Field component='input' type='password' name='password' size='small' placeholder='Create a password' style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              {
                values.password && <Box marginBottom={'16px'} color='red' >{errors.password}</Box>
              }
              <Button type='submit' variant='contained' sx={{ 'backgroundColor': 'crimson', 'color': 'white', 'fontFamily': 'var(--josefin)' }} disabled={submitting || invalid} >Edit Student</Button>
              <Typography sx={{ 'color': 'black', "marginTop": "14px", 'fontFamily': 'var(--josefin)', "fontSize": "15px" }} >Already have an account ? <Link style={{ "color": "crimson" }} to='/login' >Login</Link></Typography>
            </Box>
            <Box  >
              {
                submitting && <CircularProgress />
              }
              {
                submitError && <Alert color='error' >{submitError}</Alert>
              }
              {
                submitSucceeded && <Alert color='success' >submitSucceeded</Alert>
                }
            </Box>
          </form>
        </Box>
      }
    }
  </Form>
}
export default EditStudent