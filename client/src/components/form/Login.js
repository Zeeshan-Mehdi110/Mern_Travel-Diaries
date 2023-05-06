import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material'
import axios from 'axios'
import { FORM_ERROR } from 'final-form'
import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authActionsTypes } from '../../store/actions/authActions'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return <Form
  onSubmit={
    (data, form) => {
    
    return axios.post('http://localhost:5000/api/user/login', data)
    .then((result) => {
      dispatch({ 
        type : authActionsTypes.LOGIN,
        user : result.data.user, 
        token : result.data.token
      })
      localStorage.setItem("token" , result.data.token)
          setTimeout(() => {
            form.reset({})
            return {}
          }, 2000);
      navigate('/profile')
    }).catch(err => {
      if(err.message === "Request failed with status code 400" )
      return { [FORM_ERROR] : "invalid request" }
      return { [FORM_ERROR]: err.message }
    })
    }
  }
    validate={(data) => {
      const errors = {};

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

            <Box fontSize={'36px'} paddingBottom='24px' color='crimson' textAlign={"center"} sx={{ 'fontFamily': 'var(--josefin)' }} >Login</Box>
            <Box display={'flex'} flexDirection='column' width={600} >
              <Field component='input' type="email" name='email' size='small' placeholder='Enter your email' style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              <Field component='input' type='password' name='password' size='small' placeholder='Create a password' style={{ "marginBottom": '16px', 'padding': '14px', 'borderRadius': '5px', 'fontFamily': 'var(--josefin)', 'border': '1px solid gray', 'fontSize': '15px' }} />
              {
                values.password && <Box marginBottom={'16px'} color='red' >{errors.password}</Box>
              }
              <Button type='submit' variant='contained' style={{ 'backgroundColor': 'crimson', 'color': 'white', 'fontFamily': 'var(--josefin)' }} disabled={submitting || invalid} >Login</Button>
              <Typography sx={{ 'color': 'black', "marginTop": "14px", 'fontFamily': 'var(--josefin)', "fontSize": "15px" }} >Don't have an account ? <Link style={{ "color": "crimson" }} to='/signUp' >signUp</Link></Typography>
            </Box>
            <Box  >
              {
                submitting && <CircularProgress />
              }
              {
                submitError && <Alert color='error' >{submitError}</Alert>
              }
              {
                submitSucceeded && <Alert color='success' >login in Successfully</Alert>
              }
            </Box>
          </form>
        </Box>
      }
    }
  </Form>
}
export default Login